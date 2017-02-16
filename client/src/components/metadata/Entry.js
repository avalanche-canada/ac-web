import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Metadata.css'

Entry.propTypes = {
    term: PropTypes.string,
    children: PropTypes.node.isRequired,
    sideBySide: PropTypes.bool,
    fullWidth: PropTypes.bool,
}

function Entry({term, children, sideBySide, fullWidth}) {
    var styleName = 'Entry';
    if(sideBySide) {
        styleName = 'Entry--SideBySide';
    }else if(fullWidth) {
        styleName = 'Entry--Full';
    }
    return (
        <dl styleName={styleName}>
            <dt styleName='Term'>{term}</dt>
            <dd styleName='Description'>{children}</dd>
        </dl>
    )
}

export default CSSModules(Entry, styles)
