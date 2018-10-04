import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import * as forms from './forms'
import * as tables from './tables'
import * as utils from 'utils/search'

export class Courses extends Component {
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

export class Providers extends Component {
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
