import { cloneElement, isValidElement } from 'react'

export function renderChildren(children, values) {
    return isValidElement(children)
        ? cloneElement(children, { values })
        : children(values)
}
