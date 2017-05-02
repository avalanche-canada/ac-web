import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Controls.css'

Holder.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

function Holder({ value, placeholder }) {
    return (
        <div styleName={value ? 'Valueholder' : 'Placeholder'}>
            <div styleName="Holder--Content">
                {value || placeholder}
            </div>
        </div>
    )
}

export default CSSModules(Holder, styles)
