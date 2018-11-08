import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from 'components/ErrorBoundary'
import { Loading, Error } from 'components/text'
import Button from 'components/button'

Bundle.propTypes = {
    children: PropTypes.element.isRequired,
    fallback: PropTypes.element.isRequired,
}

export default function Bundle({ children, fallback = <Loading /> }) {
    return (
        <ErrorBoundary fallback={renderError}>
            <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
    )
}

function renderError({ error }) {
    if (error instanceof SyntaxError) {
        function reload() {
            window.location.reload(true)
        }

        return (
            <div>
                <Error>
                    An error happened while loading script. {error.message}
                </Error>
                <Button onClick={reload}>Reload the page</Button>
            </div>
        )
    }

    throw error
}
