import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import classnames from 'classnames'
import { supported } from 'utils/mapbox'
import styles from 'styles/typography.css'

Home.propTypes = {
    children: PropTypes.node,
    to: PropTypes.string,
    className: PropTypes.string,
}

export function Home({
    to = '/',
    className,
    children = 'Back to home',
    ...props
}) {
    return (
        <Link className={classnames(styles.Back, className)} to={to} {...props}>
            {children}
        </Link>
    )
}

MountainInformationNetwork.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.element,
}

export function MountainInformationNetwork({ id, children, ...props }) {
    return (
        <Link {...props} to={mountainInformationNetwork(id)}>
            {children}
        </Link>
    )
}

export function mountainInformationNetwork(id) {
    return supported()
        ? `/map?panel=mountain-information-network-submissions/${id}`
        : `/mountain-information-network/submissions/${id}`
}

Forecast.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.element,
}

export function Forecast({ id, children, ...props }) {
    return (
        <Link {...props} to={forecast(id)}>
            {children}
        </Link>
    )
}

export function forecast(id) {
    return supported() ? `/map/forecasts/${id}` : `/forecasts/${id}`
}
