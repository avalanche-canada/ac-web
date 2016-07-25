import React, {PropTypes, DOM} from 'react'
import {compose, defaultProps} from 'recompose'
import {Element} from 'compose'
import styles from './Text.css'

const component = DOM.p

function text({children = null, name}) {
    const element = Element({
        name,
        component,
        styles,
    })

    return defaultProps({children})(element)
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
