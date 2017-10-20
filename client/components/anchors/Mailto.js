import React from 'react'
import PropTypes from 'prop-types'
import Url from 'url'
import { AVALANCHECANADA } from 'constants/emails'
import { clean } from 'utils/object'

Mailto.propTypes = {
    email: PropTypes.string,
    title: PropTypes.string,
    subject: PropTypes.string,
    cc: PropTypes.string,
    bcc: PropTypes.string,
    body: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default function Mailto({
    email = AVALANCHECANADA,
    title = 'Email Avalanche Canada',
    subject,
    cc,
    bcc,
    body,
    children,
    ...rest
}) {
    const href = Url.format({
        protocol: 'mailto',
        pathname: email,
        query: clean({
            subject,
            cc,
            bcc,
            body,
        }),
    })

    return (
        <a href={href} title={title} {...rest}>
            {children || email}
        </a>
    )
}
