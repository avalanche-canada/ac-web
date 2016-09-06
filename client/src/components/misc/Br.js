import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Br.css'

Br.propTypes = {
    ribbon: PropTypes.bool,
}

function Br({ribbon = false}) {
    return (
        <div styleName={ribbon ? 'Ribbon' : 'Main'}></div>
    )
}

export default CSSModules(Br, styles)
