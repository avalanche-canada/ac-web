import React, { cloneElement, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link, Match, Router } from '@reach/router'
import { Page, Content, Banner, Main } from 'components/page'
import classnames from 'classnames'
import { Container, PillSet, Pill } from 'components/pill'
import * as forms from './forms'
import * as tables from './tables'
import * as utils from 'utils/search'
import styles from 'styles/components.css'

export default function Layout() {
    return (
        <Page>
            <Banner url={BANNER}>
                <Container>
                    <Match path=":type">
                        {props => (
                            <PillSet
                                activeIndex={Number(
                                    props.match?.type === 'providers'
                                )}>
                                <Pill>
                                    <Link to="courses">Courses</Link>
                                </Pill>
                                <Pill>
                                    <Link to="providers">Providers</Link>
                                </Pill>
                            </PillSet>
                        )}
                    </Match>
                </Container>
                <Router
                    primary={false}
                    className={classnames(styles.MatchParent, styles.Flex)}>
                    <ProvidersForm path="providers" />
                    <CoursesForm path="courses" />
                </Router>
            </Banner>
            <Main>
                <Content>
                    <Router className={styles.FullWidth}>
                        <ProvidersTable path="providers" />
                        <CoursesTable path="courses" />
                    </Router>
                </Content>
            </Main>
        </Page>
    )
}

Courses.propTypes = {
    location: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    children: PropTypes.element,
}

function Courses({ children, location, navigate }) {
    const props = useMemo(() => {
        const place = location?.state?.place
        let { level, from, to, tags, sorting } = utils.parse(location.search)
        from = typeof from === 'string' ? utils.parseDate(from) : from
        to = typeof to === 'string' ? utils.parseDate(to) : to
        tags = utils.toSet(tags)
        sorting =
            typeof sorting === 'string' ? utils.parseSorting(sorting) : sorting
        const params = {
            level,
            from,
            to,
            tags,
            sorting,
            place,
        }

        return {
            ...params,
            onParamsChange(newParams) {
                const { place, ...rest } = Object.assign(params, newParams)

                rest.sorting = utils.formatSorting(rest.sorting)

                navigate(utils.stringify(rest), {
                    state: { place },
                    replace: true,
                })
            },
        }
    }, [location])

    return cloneElement(children, props)
}

function CoursesTable(props) {
    return (
        <Courses {...props}>
            <tables.Courses />
        </Courses>
    )
}

function CoursesForm(props) {
    return (
        <Courses {...props}>
            <forms.Courses {...props} />
        </Courses>
    )
}

Providers.propTypes = {
    location: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    children: PropTypes.element,
}

function Providers({ children, location, navigate }) {
    const props = useMemo(() => {
        const place = location?.state?.place
        let { tags, sorting } = utils.parse(location.search)
        tags = utils.toSet(tags)
        sorting =
            typeof sorting === 'string' ? utils.parseSorting(sorting) : sorting
        const params = {
            tags,
            sorting,
            place,
        }

        return {
            ...params,
            onParamsChange(newParams) {
                const { sorting, place, ...rest } = Object.assign(
                    params,
                    newParams
                )
                const search = utils.stringify({
                    ...rest,
                    sorting: utils.formatSorting(sorting),
                })

                navigate(search, {
                    state: { place },
                    replace: true,
                })
            },
        }
    }, [location])

    return cloneElement(children, props)
}

function ProvidersTable(props) {
    return (
        <Providers {...props}>
            <tables.Providers />
        </Providers>
    )
}

function ProvidersForm(props) {
    return (
        <Providers {...props}>
            <forms.Providers />
        </Providers>
    )
}

// Constants
const BANNER =
    '//res.cloudinary.com/avalanche-ca/image/upload/c_scale,w_2500/c_scale,e_make_transparent:10,g_south_east,l_watermark:Dunford_RyenReverse,w_200/v1440539610/Youth/DSC_0339.jpg'
