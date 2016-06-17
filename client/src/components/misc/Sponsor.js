import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Sponsor.css'

Sponsor.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    term: PropTypes.string,
}

function Sponsor({ name, url, term = 'Brought to you by' }) {
    return (
        <dl styleName='Container'>
            <dt styleName='Label'>{term}</dt>
            <dd styleName='Logo'>
                <img src={url} title={name} />
            </dd>
        </dl>
    )
}

export default CSSModules(Sponsor, styles)
