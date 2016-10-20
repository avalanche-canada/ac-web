import React, {PropTypes} from 'react'
import {compose, onlyUpdateForKeys} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Sponsor.css'

Sponsor.propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    label: PropTypes.string,
}

function Sponsor({name, src, url, label = 'Brought to you by'}) {
    return (
        <a href={url} target='_blank' title={name} >
            <dl styleName='Container'>
                {label &&
                    <dt styleName='Label'>
                        {label}
                    </dt>
                }
                <dd styleName='Logo'>
                    <img src={src} title={name} />
                </dd>
            </dl>
        </a>
    )
}

export default compose(
    onlyUpdateForKeys(['name', 'src', 'url']),
    CSSModules(styles),
)(Sponsor)
