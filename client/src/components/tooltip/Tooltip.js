import React, {PropTypes} from 'react'
import CSSModule from 'react-css-modules'
import styles from './Tooltip.css'

Tooltip.propTypes = {
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    children: PropTypes.node,isRequired,
}

function Tooltip({placement, children, style}) {
    return (
        <div styleName={`Container--${placement}`} style={style}>
            <div styleName={`Arrow--${placement}`} />
            <div styleName='Content'>
                {children}
            </div>
        </div>
    )
}

export default CSSModule(Tooltip, styles)
