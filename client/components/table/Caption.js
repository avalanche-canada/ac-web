import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { onlyUpdateForKey } from 'compose'
import styles from './Table.css'

Caption.propTypes = {
    children: PropTypes.node.isRequired,
}

function Caption({ children }) {
    return (
        <caption styleName="Caption">
            {children}
        </caption>
    )
}

export default onlyUpdateForKey('children')(CSSModules(Caption, styles))
