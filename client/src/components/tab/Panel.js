import React from 'react'
import PropTypes from 'prop-types'
import {compose, onlyUpdateForKeys} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Tab.css'

Panel.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
}

function Panel({children, active = false}) {
    const styleName = active === true ? 'Panel--Active' : 'Panel'

    return (
        <div styleName={styleName} role='tabpanel'>
            {children}
        </div>
    )
}

export default compose(
    onlyUpdateForKeys(['active', 'children']),
    CSSModules(styles),
)(Panel)
