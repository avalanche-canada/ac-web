import React from 'react'
import PropTypes from 'prop-types'
import Url from 'url'

Phone.propTypes = {
    phone: PropTypes.string.isRequired,
    ext: PropTypes.string,
    children: PropTypes.node,
}

function computePhoneString(phone, ext) {
    return `${phone}${ext ? ` ext. ${ext}` : ''}`
}

export default function Phone({ phone, ext, children, ...rest }) {
    const href = Url.format({
        protocol: 'tel',
        pathname: phone,
    })

    return (
        <a href={href} {...rest}>
            {children || computePhoneString(phone, ext)}
        </a>
    )
}
