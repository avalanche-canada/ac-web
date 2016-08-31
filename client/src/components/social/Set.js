import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import Item from './Item'
import styles from './Social.css'

Set.propTypes = {
    links: PropTypes.arrayOf(PropTypes.string),
    fullName: PropTypes.string.isRequired,
}

function Set({links, fullName}) {
    return (
        <div styleName='Set'>
            {links.map(link => <Item link={link} fullName={fullName} />)}
        </div>
    )
}

export default CSSModules(Set, styles)
