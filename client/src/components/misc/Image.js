import React, {PropTypes, DOM} from 'react'
import {nest, branch, renderComponent} from 'recompose'
import {Element} from 'compose'
import styles from './Image.css'

export const Image = Element({
    name: 'Image',
    styles,
    component: DOM.img,
    propTypes: {
        openNewTab: PropTypes.bool,
    }
})

function AnchorFromImage({src, alt, children}) {
    return (
        <a href={src} title={alt} target='_blank'>
            {children}
        </a>
    )
}

export default branch(
    props => props.openNewTab,
    renderComponent(nest(AnchorFromImage, Image)),
    renderComponent(Image),
)(Image)
