import React, { createContext, useContext, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import * as utils from 'utils/fetch'

// Context
const AsyncContext = createContext()

export const { Provider } = AsyncContext

// Components
Pending.propTypes = {
    children: PropTypes.element,
}

export function Pending({ children }) {
    return usePending() === true ? children : null
}

Found.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
}

export function Found({ children }) {
    const payload = usePayload()

    if (!payload) {
        return null
    }

    return typeof children === 'function'
        ? children(payload)
        : cloneElement(children, { payload })
}

// Error related components
NotFound.propTypes = {
    children: PropTypes.element,
}

export function NotFound({ children }) {
    return <HTTPError status={404}>{children}</HTTPError>
}

HTTPError.propTypes = {
    children: PropTypes.element,
    status: PropTypes.number,
}

export function HTTPError({ children, status }) {
    const error = useHTTPError()

    if (!error) {
        return null
    }

    children = cloneElement(children, { error })

    if (typeof status === 'number') {
        return error.status === status ? children : null
    }

    return error ? children : null
}

export function FirstError({ children }) {
    const error = useError()

    if (!error) {
        return null
    }

    return Children.toArray(children).find(({ type }) => {
        switch (type) {
            case NotFound:
                return error.status === 404
            case HTTPError:
                return error instanceof utils.HTTPError
            default:
                return true
        }
    })
}

// Utils
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
