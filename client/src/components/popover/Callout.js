import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Callout.css'

export const TOP = 'Top'
export const BOTTOM = 'Bottom'
export const LEFT = 'Left'
export const RIGHT = 'Right'

Callout.propTypes = {
    children: PropTypes.node.isRequired,
    placement: PropTypes.oneOf([TOP, BOTTOM, LEFT, RIGHT]),
}

function Callout({ children, placement = RIGHT }) {
    return (
        <div styleName={placement}>
            <div styleName='Inner'>
                {children}
            </div>
        </div>
    )
}

export default CSSModules(Callout, styles)
