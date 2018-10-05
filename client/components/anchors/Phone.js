import React from 'react'
import PropTypes from 'prop-types'

Phone.propTypes = {
    phone: PropTypes.string.isRequired,
    ext: PropTypes.string,
    children: PropTypes.node,
}

export default function Phone({ phone, ext, children, ...rest }) {
    const href = `tel:${phone}`

    return (
        <a href={href} {...rest}>
            {children || computePhoneString(phone, ext)}
        </a>
    )
}

// Utils
function computePhoneString(phone, ext) {
    return `${phone}${ext ? ` ext. ${ext}` : ''}`
}
