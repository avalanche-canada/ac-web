import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Callout.css'

export const TOP = 'top'
export const BOTTOM = 'bottom'
export const LEFT = 'left'
export const RIGHT = 'right'

const styleNames = new Map([
    [TOP, 'Top'],
    [BOTTOM, 'Bottom'],
    [LEFT, 'Left'],
    [RIGHT, 'Right'],
])

Callout.propTypes = {
    children: PropTypes.node.isRequired,
    placement: PropTypes.oneOf([TOP, BOTTOM, LEFT, RIGHT]),
}

function Callout({children, placement = RIGHT, style}) {
    return (
        <div styleName={styleNames.get(placement)} style={style}>
            <div styleName='Inner'>
                {children}
            </div>
        </div>
    )
}

export default CSSModules(Callout, styles)
