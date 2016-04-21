import React, { PropTypes } from 'react'
import url from 'url'

Mailto.propTypes = {
    email: PropTypes.string.isRequired,
    title: PropTypes.string,
    subject: PropTypes.string,
    cc: PropTypes.string,
    bcc: PropTypes.string,
    body: PropTypes.string,
}

export default function Mailto({ email, title, children, ...rest }) {
    const href = url.format({
        protocol: 'mailto',
        pathname: email,
        query: rest,
    })

    return (
        <a {...{href, title}}>{children || email}</a>
    )
}
