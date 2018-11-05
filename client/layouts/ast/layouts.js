import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Link, Match, Router } from '@reach/router'
import { Page, Content, Banner, Main, Header, Article } from 'components/page'
import classnames from 'classnames'
import { Container, PillSet, Pill } from 'components/pill'
import * as forms from './forms'
import * as tables from './tables'
import * as utils from 'utils/search'
import styles from 'styles/components.css'

export default class AstLayout extends Component {
    renderNavbar(props) {
        return (
            <PillSet activeIndex={Number(props.match?.type === 'providers')}>
                <Pill>
                    <Link to="courses">Courses</Link>
                </Pill>
                <Pill>
                    <Link to="providers">Providers</Link>
                </Pill>
            </PillSet>
        )
    }
    render() {
        return (
            <Page>
                <Banner url={BANNER}>
                    <Container>
                        <Match path=":type">{this.renderNavbar}</Match>
                    </Container>
                    <Router
                        primary={false}
                        className={classnames(styles.MatchParent, styles.Flex)}>
                        <Providers.Form path="providers" />
                        <Courses.Form path="courses" />
                    </Router>
                </Banner>
                <Main>
                    <Content>
                        <Router className={styles.FullWidth}>
                            <Providers.Table path="providers" />
                            <Courses.Table path="courses" />
                        </Router>
                    </Content>
                </Main>
            </Page>
        )
    }
}

class Courses extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        navigate: PropTypes.func.isRequired,
        children: PropTypes.element,
    }
    static Table(props) {
        return (
            <Courses {...props}>
                <tables.Courses />
            </Courses>
        )
    }
    static Form(props) {
        return (
            <Courses {...props}>
                <forms.Courses {...props} />
            </Courses>
        )
    }
    shouldComponentUpdate({ location }) {
        return location !== this.props.location
    }
    get params() {
        const { location } = this.props
        const place = location?.state?.place
        const params = utils.parse(location.search)
        const { level, from, to, tags, sorting } = params

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
    handleParamsChange = params => {
        const { sorting, place, ...rest } = Object.assign(this.params, params)

        rest.sorting = utils.formatSorting(sorting)

        this.props.navigate(utils.stringify(rest), {
            state: { place },
            replace: true,
        })
    }
    get value() {
        return {
            ...this.params,
            onParamsChange: this.handleParamsChange,
        }
    }
    render() {
        return cloneElement(this.props.children, this.value)
    }
}

class Providers extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        navigate: PropTypes.func.isRequired,
        children: PropTypes.element,
    }
    static Table(props) {
        return (
            <Providers {...props}>
                <tables.Providers />
            </Providers>
        )
    }
    static Form(props) {
        return (
            <Providers {...props}>
                <forms.Providers />
            </Providers>
        )
    }
    shouldComponentUpdate({ location }) {
        return location !== this.props.location
    }
    get params() {
        const { location } = this.props
        const { tags, sorting } = utils.parse(location.search)
        const place = location?.state?.place

        return {
            tags: utils.toSet(tags),
            sorting:
                typeof sorting === 'string'
                    ? utils.parseSorting(sorting)
                    : sorting,
            place,
        }
    }
    handleParamsChange = params => {
        const { sorting, place, ...rest } = Object.assign(this.params, params)
        const search = utils.stringify({
            ...rest,
            sorting: utils.formatSorting(sorting),
        })

        this.props.navigate(search, {
            state: { place },
            replace: true,
        })
    }
    get value() {
        return {
            ...this.params,
            onParamsChange: this.handleParamsChange,
        }
    }
    render() {
        return cloneElement(this.props.children, this.value)
    }
}

// Constants
const BANNER =
    '//res.cloudinary.com/avalanche-ca/image/upload/c_scale,w_2500/c_scale,e_make_transparent:10,g_south_east,l_watermark:Dunford_RyenReverse,w_200/v1440539610/Youth/DSC_0339.jpg'
