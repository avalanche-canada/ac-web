import { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import classnames from 'classnames'
import isSupported from '@mapbox/mapbox-gl-supported'
import styles from 'styles/typography.css'

export class Home extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
    }
    static defaultProps = {
        children: 'Back to home',
        to: '/',
    }
    render() {
        return createElement(Link, {
            ...this.props,
            className: classnames(styles.Back, this.props.className),
        })
    }
}

export class MountainInformationNetwork extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }
    render() {
        const { id, ...props } = this.props

        return createElement(Link, {
            ...props,
            to: mountainInformationNetwork(id),
        })
    }
}

export function mountainInformationNetwork(id) {
    return isSupported()
        ? `/map?panel=mountain-information-network-submissions/${id}`
        : `/mountain-information-network/submissions/${id}`
}

export class Forecast extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }
    render() {
        const { id, ...props } = this.props

        return createElement(Link, { ...props, to: forecast(id) })
    }
}

export function forecast(id) {
    return isSupported() ? `/map/forecasts/${id}` : `/forecasts/${id}`
}
