import React from 'react'
import PropTypes from 'prop-types'
import { INFO } from 'constants/emails'
import { clean } from 'utils/object'

Mailto.propTypes = {
    email: PropTypes.string,
    title: PropTypes.string,
    subject: PropTypes.string,
    cc: PropTypes.string,
    bcc: PropTypes.string,
    body: PropTypes.string,
    children: PropTypes.element.isRequired,
}

export default function Mailto({
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
    let href = `mailto:${email}`

    if (search) {
        href = `${href}?${search}`
    }

    return (
        <a href={href} title={title} {...rest}>
            {children || email}
        </a>
    )
}
