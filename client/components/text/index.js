import React from 'react'
import styles from './Text.css'

// TODO Should be a typography???????
// typography.css
// typography.js

export const Muted = createText('p', styles.Muted)
export const Loading = createText('p', styles.Loading, 'Loading...')
export const Error = createText('p', styles.Error, 'An error happened.')
export const Helper = createText('span', styles.Helper)
export const Warning = createText('p', styles.Warning)

// Factory
function createText(component, className, text) {
    return function Text({
        component: Component = component,
        children = text,
        ...props
    }) {
        return (
            <Component {...props} className={className}>
                {children}
            </Component>
        )
    }
}
