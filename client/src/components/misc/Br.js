import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Br.css'

Br.propTypes = {
    withRibbon: PropTypes.bool,
}

function Br({withRibbon = false}) {
    return (
        <div styleName={withRibbon ? 'Ribbon' : 'Main'}></div>
    )
}

export default CSSModules(Br, styles)
