import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Metadata.css'

Entry.propTypes = {
    term: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

function Entry({term, children, style}) {
    return (
        <dl styleName='Entry' style={style}>
            <dt styleName='Term'>{term}</dt>
            <dd styleName='Description'>{children}</dd>
        </dl>
    )
}

export default CSSModules(Entry, styles)
