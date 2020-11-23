import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isRedirect } from '@reach/router'
import { captureException } from 'services/sentry'
import typography from 'components/text/Text.module.css'
import { FormattedMessage } from 'react-intl'

export class Boundary extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        fallback: PropTypes.element.isRequired,
        onError: PropTypes.func,
        capture: PropTypes.bool,
    }
    static defaultProps = {
        onError() {},
        capture: true,
    }
    static getDerivedStateFromError(error) {
        return {
            error: isRedirect(error) ? null : error,
        }
    }
    state = {}
    componentDidCatch(error, extra) {
        if (isRedirect(error)) {
            throw error
        }

        const { onError, capture } = this.props

        if (capture) {
            // https://blog.sentry.io/2017/09/28/react-16-error-boundaries
            captureException(error, { extra })
        }

        this.setState({ error, extra }, () => {
            onError(error, extra)
        })
    }
    render() {
        const { children, fallback } = this.props

        return this.state.error ? cloneElement(fallback, this.state) : children
    }
}

Details.propTypes = {
    error: PropTypes.instanceOf(Error),
    className: PropTypes.string,
    summary: PropTypes.string,
    children: PropTypes.node,
}

export function Details({
    error,
    className,
    summary = (
        <FormattedMessage description="Component Error" defaultMessage="An error occurred." />
    ),
    children,
}) {
    return (
        <details className={classnames(typography.Error, className)}>
            <summary>{summary}</summary>
            {error && <p>{error.message}</p>}
            {children}
        </details>
    )
}
