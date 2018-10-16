import React, { createElement } from 'react'
import * as router from '@reach/router'
import classnames from 'classnames/bind'
import Button from './Button'
import { TERTIARY } from './kinds'
import styles from './Button.css'

export default from './Button'

export Expand from './Expand'
export Sorting from './Sorting'
export Close from './Close'
export Locate from './Locate'

export * from './kinds'

export ButtonSet from './ButtonSet'

export function Reset(props) {
    return <Button kind={TERTIARY} {...props} type="reset" />
}
export function Submit(props) {
    return <Button {...props} type="submit" />
}

export function Link({ children, chevron, ...props }) {
    return createElement(
        router.Link,
        Object.assign(props, {
            className: classNames({
                Primary: true,
                Chevron: chevron,
            }),
        }),
        children
    )
}

const classNames = classnames.bind(styles)
