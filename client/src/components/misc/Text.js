import React, {PropTypes, DOM} from 'react'
import {compose, defaultProps} from 'recompose'
import {Element} from 'compose'
import styles from './Text.css'

function text({children = null, name, component = DOM.p}) {
    return defaultProps({children})(Element({
        name,
        component,
        styles,
    }))
}

export const Text = text({
    name: 'Text',
})

export const Muted = text({
    name: 'Muted',
})

export const Loading = text({
    name: 'Loading',
    children: 'Loading...',
})

export const Error = text({
    name: 'Error',
    children: 'An error happened.',
})

export const Warning = text({
    name: 'Warning',
})

export const Helper = text({
    name: 'Helper',
    component: DOM.span,
})
