import React, {PropTypes} from 'react'
import url from 'url'

const EMAIL = 'info@avalanche.ca'
const TITLE = 'Email Avalanche Canada'

Mailto.propTypes = {
    email: PropTypes.string,
    title: PropTypes.string,
    subject: PropTypes.string,
    cc: PropTypes.string,
    bcc: PropTypes.string,
    body: PropTypes.string,
}

export default function Mailto({email = EMAIL, title = TITLE, children, ...rest}) {
    const href = url.format({
        protocol: 'mailto',
        pathname: email,
        query: rest,
    })

    return (
        <a {...{href, title}}>
            {children || email}
        </a>
    )
}
