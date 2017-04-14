import React, {DOM} from 'react'
import PropTypes from 'prop-types'
import {compose, withHandlers, onlyUpdateForKeys} from 'recompose'
import {Element, neverUpdate} from '~/compose'
import CSSModules from 'react-css-modules'
import styles from './Pagination.css'

Segment.propTypes = {
    page: PropTypes.number.isRequired,
    onActivate: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    children: PropTypes.node,
}

function Segment({page, onClick, isActive, children, style}) {
    const styleName = isActive ? 'Segment--Active' : 'Segment'

    return (
        <a href='#' onClick={onClick} styleName={styleName} style={style} >
            {children || page}
        </a>
    )
}

export default compose(
    onlyUpdateForKeys(['isActive', 'page']),
    withHandlers({
        onClick: props => event => {
            event.preventDefault()
            props.onActivate(props.page)
        }
    }),
    CSSModules(styles),
)(Segment)


export const Disabled = neverUpdate(Element({
    component: DOM.span,
    name: 'Disabled',
    styles,
}))
