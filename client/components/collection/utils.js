import { cloneElement } from 'react'

export function renderChildren(children, values) {
    return typeof children === 'function'
        ? children(values)
        : cloneElement(children, { values })
}
