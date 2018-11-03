import React, { Component, Suspense } from 'react'
import PropTypes from 'prop-types'
import { SessionStorage } from 'services/storage'
import ErrorBoundary from 'components/ErrorBoundary'
import { Loading } from 'components/text'

export default class Bundle extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        fallback: PropTypes.element.isRequired,
    }
    static defaultProps = {
        fallback: <Loading />,
    }
    get ref() {
        return STORAGE.get(KEY)
    }
    set ref(ref) {
        STORAGE.set(KEY, ref)
    }
    componentDidMount() {
        if (this.ref !== window.location.href) {
            this.ref = null
        }
    }
    handleError(error) {
        if (error instanceof SyntaxError && this.ref === null) {
            this.ref = window.location.href

            window.location.reload(true)
        } else {
            throw error
        }
    }
    render() {
        const { fallback, children } = this.props

        return (
            <ErrorBoundary onError={this.handleError}>
                <Suspense fallback={fallback}>{children}</Suspense>
            </ErrorBoundary>
        )
    }
}

const STORAGE = SessionStorage.create()
const KEY = 'bundle.reloaded'
