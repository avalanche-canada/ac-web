import React from 'react'
import PropTypes from 'prop-types'
import { INFO } from 'constants/emails'
import { clean } from 'utils/object'

Phone.propTypes = {
    phone: PropTypes.string.isRequired,
    ext: PropTypes.string,
    children: PropTypes.node,
}

export function Phone({ phone, ext, children, ...rest }) {
    const href = `tel:${phone}`

    return (
        <a href={href} {...rest}>
            {children || `${phone}${ext ? ` ext. ${ext}` : ''}`}
        </a>
    )
}

Mailto.propTypes = {
    email: PropTypes.string,
    title: PropTypes.string,
    subject: PropTypes.string,
    cc: PropTypes.string,
    bcc: PropTypes.string,
    body: PropTypes.string,
    children: PropTypes.element.isRequired,
}

export function Mailto({
    email = INFO,
    title = email,
    subject,
    cc,
    bcc,
    body,
    children,
    ...rest
}) {
    const params = new URLSearchParams(clean({ subject, cc, bcc, body }))
    const search = params.toString()
    let href = 'mailto:' + email

    if (search) {
        href = `${href}?${search}`
    }

    return (
        <a href={href} title={title} {...rest}>
            {children || email}
        </a>
    )
}
