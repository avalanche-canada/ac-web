import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import typography from 'components/text/Text.css'

ErrorDetails.propTypes = {
    error: PropTypes.instanceOf(Error),
    className: PropTypes.string,
    summary: PropTypes.string,
    children: PropTypes.node,
}

export function ErrorDetails({
    error,
    className,
    summary = 'An error occured.',
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
