import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Switch } from 'react-router-dom'
import { Container, PillSet, Pill } from 'components/pill'
import { Route } from 'react-router-dom'
import { Page, Content, Banner, Main } from 'components/page'
import CoursesTable from './ast/table/Courses'
import ProvidersTable from './ast/table/Providers'
import CoursesForm from './ast/form/Courses'
import ProvidersForm from './ast/form/Providers'
import * as utils from 'utils/search'
import get from 'lodash/get'

export default function Ast() {
    return (
        <Switch>
            <Route path="/training/courses" component={CourseRoute} />
            <Route path="/training/providers" component={ProviderRoute} />
        </Switch>
    )
}

function Layout({ form, table, type }) {
    return (
        <Page>
            <Banner url="//res.cloudinary.com/avalanche-ca/image/upload/c_scale,w_2500/c_scale,e_make_transparent:10,g_south_east,l_watermark:Dunford_RyenReverse,w_200/v1440539610/Youth/DSC_0339.jpg">
                <Container>
                    <PillSet activeIndex={type === 'courses' ? 0 : 1}>
                        <Pill>
                            <Link to="/training/courses">Courses</Link>
                        </Pill>
                        <Pill>
                            <Link to="/training/providers">Providers</Link>
                        </Pill>
                    </PillSet>
                </Container>
                {form}
            </Banner>
            <Main>
                <Content>{table}</Content>
            </Main>
        </Page>
    )
}

class CourseRoute extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }
    state = {}
    constructor(props) {
        super(props)

        const { search } = props.location
        const params = utils.parse(search)
        const place = get(props.location, 'state.place')

        this.state = this.prepareParams({ ...params, place })
    }
    prepareParams = params => {
        const { level, from, to, tags, place, sorting } = Object.assign(
            {},
            this.state,
            params
        )

        return {
            level,
            from: typeof from === 'string' ? utils.parseDate(from) : from,
            to: typeof to === 'string' ? utils.parseDate(to) : to,
            tags: utils.toSet(tags),
            sorting:
                typeof sorting === 'string'
                    ? utils.parseSorting(sorting)
                    : sorting,
            place,
        }
    }
    pushToHistory = () => {
        const { sorting, place, ...rest } = this.state

        this.props.history.push({
            search: utils.stringify({
                ...rest,
                sorting: utils.formatSorting(sorting),
            }),
            state: {
                place,
            },
        })
    }
    handleParamsChange = params => {
        this.setState(this.prepareParams(params), this.pushToHistory)
    }
    render() {
        const props = {
            ...this.state,
            onParamsChange: this.handleParamsChange,
        }

        return (
            <Layout
                type="courses"
                form={<CoursesForm {...props} />}
                table={<CoursesTable {...props} />}
            />
        )
    }
}

class ProviderRoute extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }
    state = {}
    constructor(props) {
        super(props)

        const { location } = props
        const params = utils.parse(location.search)
        const place = get(location, 'state.place')

        this.state = this.prepareParams({ ...params, place })
    }
    prepareParams(params) {
        const { tags, place, sorting } = Object.assign({}, this.state, params)

        return {
            tags: utils.toSet(tags),
            sorting:
                typeof sorting === 'string'
                    ? utils.parseSorting(sorting)
                    : sorting,
            place,
        }
    }
    pushToHistory = () => {
        const { sorting, place, ...rest } = this.state

        this.props.history.push({
            search: utils.stringify({
                ...rest,
                sorting: utils.formatSorting(sorting),
            }),
            state: {
                place,
            },
        })
    }
    handleParamsChange = params => {
        this.setState(this.prepareParams(params), this.pushToHistory)
    }
    render() {
        const props = {
            ...this.state,
            onParamsChange: this.handleParamsChange,
        }

        return (
            <Layout
                type="providers"
                form={<ProvidersForm {...props} />}
                table={<ProvidersTable {...props} />}
            />
        )
    }
}
