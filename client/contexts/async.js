import React, {
    createContext,
    useContext,
    cloneElement,
    isValidElement,
    Children,
} from 'react'
import PropTypes from 'prop-types'
import * as utils from 'utils/fetch'

// Context
const AsyncContext = createContext()

export const { Provider } = AsyncContext

// Components
Pending.propTypes = {
    children: PropTypes.node,
}

export function Pending({ children }) {
    return usePending() === true ? children : null
}

Found.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.element,
        PropTypes.node,
    ]).isRequired,
}

export function Found({ children }) {
    const payload = usePayload()

    if (!payload) {
        return null
    }

    if (typeof children === 'function') {
        return children(payload)
    }

    return isValidElement(children)
        ? cloneElement(children, { payload })
        : children
}

// Case for Prismic document. There no concept of NotFound error for Prismic documents.
Empty.propTypes = {
    children: PropTypes.node,
}

export function Empty({ children }) {
    const payload = usePayload()
    const pending = usePending()
    const error = useError()
    const empty = !payload && !pending && !error

    return empty ? children : null
}

// Error related components
Error.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
}

export function Error({ children }) {
    const error = useError()

    if (!error) {
        return null
    }

    if (isValidElement(children)) {
        children = cloneElement(children, { error })
    }

    return children
}

HTTPError.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
    status: PropTypes.number,
}

export function HTTPError({ children, status }) {
    const error = useHTTPError()

    if (!error) {
        return null
    }

    if (isValidElement(children)) {
        children = cloneElement(children, { error })
    }

    if (typeof status === 'number') {
        return error.status === status ? children : null
    }

    return children
}

NotFound.propTypes = {
    children: PropTypes.node,
}

export function NotFound({ children }) {
    return <HTTPError status={404}>{children}</HTTPError>
}

export function Throw() {
    const error = useError()

    if (error) {
        throw error
    }

    return null
}

export function FirstError({ children }) {
    const error = useError()

    if (!error) {
        return null
    }
    return (
        Children.toArray(children).find(({ type }) => {
            switch (type) {
                case NotFound:
                    return error.status === 404
                case HTTPError:
                    return error instanceof utils.HTTPError
                case Error:
                    return error instanceof window.Error
                default:
                    return true
            }
        }) || null
    )
}

// Util hooks
function usePayload() {
    return useAsyncContext(0)
}
function usePending() {
    return useAsyncContext(1)
}
function useError() {
    return useAsyncContext(2)
}
function useHTTPError() {
    const error = useError()

    return error instanceof utils.HTTPError ? error : null
}
function useAsyncContext(index) {
    const context = useContext(AsyncContext)

    return context[index]
}
