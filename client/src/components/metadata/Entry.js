import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Metadata.css'

Entry.propTypes = {
    term: PropTypes.string,
    children: PropTypes.node.isRequired,
    sideBySide: PropTypes.bool,
}

function Entry({term, children, sideBySide}) {
    return (
        <dl styleName={sideBySide ? 'Entry--SideBySide' : 'Entry'}>
            <dt styleName='Term'>{term}</dt>
            <dd styleName='Description'>{children}</dd>
        </dl>
    )
}

export default CSSModules(Entry, styles)
