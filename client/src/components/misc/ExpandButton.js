import React, { PropTypes, Children, cloneElement } from 'react'
import CSSModules from 'react-css-modules'
import styles from './ExpandButton.css'
import { Remove, Add } from '../icons'

function K() {}

ExpandButton.propTypes = {
    expanded: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

function ExpandButton({ expanded = false, onClick = K }) {
    return (
        <button styleName='Main' onClick={onClick}>
            {expanded ? <Add /> : <Remove />}
        </button>
    )
}

export default CSSModules(ExpandButton, styles)
