import React from 'react'
import PropTypes from 'prop-types'
import {compose, onlyUpdateForKeys} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Sponsor.css'
import {handleOutboundSponsorClick} from '/services/analytics'

Sponsor.propTypes = {
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    label: PropTypes.string,
}

function Sponsor({name, logo, url, label = 'Brought to you by'}) {
    return (
        <a href={url} target='_blank' title={name} onClick={handleOutboundSponsorClick}>
            <dl styleName='Container'>
                {label &&
                    <dt styleName='Label'>
                        {label}
                    </dt>
                }
                <dd styleName='Logo'>
                    <img src={logo} title={name} />
                </dd>
            </dl>
        </a>
    )
}

export default compose(
    onlyUpdateForKeys(['name', 'src', 'url']),
    CSSModules(styles),
)(Sponsor)
