import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, PillSet, Pill } from 'components/pill'
import { Route } from 'react-router-dom'
import { Page, Content, Banner, Main } from 'components/page'
import CoursesTable from './ast/table/Courses'
import ProvidersTable from './ast/table/Providers'
import CoursesForm from './ast/form/Courses'
import ProvidersForm from './ast/form/Providers'
import * as utils from 'utils/search'
import get from 'lodash/get'

const ROUTES = ['courses', 'providers']

Ast.propTypes = {
    match: PropTypes.object.isRequired,
}

export default function Ast({ match }) {
    return (
        <Page>
            <Banner url="//res.cloudinary.com/avalanche-ca/image/upload/c_scale,w_2500/c_scale,e_make_transparent:10,g_south_east,l_watermark:Dunford_RyenReverse,w_200/v1440539610/Youth/DSC_0339.jpg">
                <Container>
                    <PillSet activeIndex={ROUTES.indexOf(match.params.type)}>
                        <Pill>
                            <Link to="/training/courses">Courses</Link>
                        </Pill>
                        <Pill>
                            <Link to="/training/providers">Providers</Link>
                        </Pill>
                    </PillSet>
                </Container>
                <Route
                    path="/training/courses"
                    render={courseRendererFactory(CoursesForm)}
                />
                <Route
                    path="/training/providers"
                    render={providerRendererFactory(ProvidersForm)}
                />
            </Banner>
            <Main>
                <Content>
                    <Route
                        path="/training/courses"
                        render={courseRendererFactory(CoursesTable)}
                    />
                    <Route
                        path="/training/providers"
                        render={providerRendererFactory(ProvidersTable)}
                    />
                </Content>
            </Main>
        </Page>
    )
}

function courseRendererFactory(Component) {
    return function CourseRoute({ location, history }) {
        const { level, tags, from, to, sorting } = utils.parse(location.search)
        const props = {
            level,
            from: utils.parseDate(from),
            to: utils.parseDate(to),
            tags: utils.toSet(tags),
            sorting: utils.parseSorting(sorting),
            place: get(location, 'state.place'),
        }
        function onParamChange(params) {
            const { sorting, place, ...rest } = Object.assign(props, params)

            history.push({
                ...location,
                search: utils.stringify({
                    ...rest,
                    sorting: utils.formatSorting(sorting),
                }),
                state: {
                    place,
                },
            })
        }

        return <Component {...props} onParamChange={onParamChange} />
    }
}
function providerRendererFactory(Component) {
    return function ProviderRoute({ location, history }) {
        const { tags, sorting } = utils.parse(location.search)
        const props = {
            tags: utils.toSet(tags),
            sorting: utils.parseSorting(sorting),
            place: get(location, 'state.place'),
        }
        function onParamChange(params) {
            const { sorting, place, ...rest } = Object.assign(props, params)

            history.push({
                ...location,
                search: utils.stringify({
                    ...rest,
                    sorting: utils.formatSorting(sorting),
                }),
                state: {
                    place,
                },
            })
        }

        return <Component {...props} onParamChange={onParamChange} />
    }
}
