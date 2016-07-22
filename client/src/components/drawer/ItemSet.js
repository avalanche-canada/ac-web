import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import Item from './Item'

ItemSet.propTypes = {
    style: PropTypes.object,
    children: PropTypes.arrayOf(PropTypes.instanceOf(Item)).isRequired,
}

function ItemSet({ style = null, children }) {
    return (
        <div style={style} styleName='ItemSet--Container'>
            <ul styleName='ItemSet'>
                {children}
            </ul>
        </div>
    )
}

export default CSSModules(ItemSet, styles)
