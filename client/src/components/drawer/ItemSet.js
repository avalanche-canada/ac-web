import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'

ItemSet.propTypes = {
    children: PropTypes.node.isRequired,
}

function ItemSet({children}) {
    return (
        <div styleName='ItemSet--Container'>
            <ul styleName='ItemSet'>
                {children}
            </ul>
        </div>
    )
}

export default CSSModules(ItemSet, styles)
