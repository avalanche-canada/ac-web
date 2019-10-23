import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Link, Match, Router } from '@reach/router'
import { Page, Content, Banner, Main } from 'components/page'
import classnames from 'classnames'
import { Container, Set, Item } from 'components/pill'
import * as forms from './forms'
import * as tables from './tables'
import useParams, {
    DateParam,
    SetParam,
    SortingParam,
    StringParam,
} from 'hooks/params'
import styles from 'styles/components.css'

export default function Layout() {
    return (
        <Page>
            <Banner url={BANNER}>
                <Container>
                    <Match path=":type">
                        {props => (
                            <Set
                                activeIndex={Number(
                                    props.match?.type === 'providers'
                                )}>
                                <Item>
                                    <Link to="courses">Courses</Link>
                                </Item>
                                <Item>
                                    <Link to="providers">Providers</Link>
                                </Item>
                            </Set>
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
    const [params, stringify] = useParams({
        level: StringParam,
        from: DateParam,
        to: DateParam,
        tags: SetParam,
        sorting: SortingParam,
    })
    const place = location.state?.place

    return cloneElement(children, {
        ...params,
        place,
        onParamsChange({ place, ...rest }) {
            navigate(stringify(rest), {
                state: {
                    place: place || location.state?.place,
                },
                replace: true,
            })
        },
    })
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
    const { place } = location.state || {}
    const [params, stringify] = useParams({
        tags: SetParam,
        sorting: SortingParam,
    })

    return cloneElement(children, {
        ...params,
        place,
        onParamsChange(params) {
            navigate(stringify(params), {
                state: {
                    place: params.place || place,
                },
                replace: true,
            })
        },
    })
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
