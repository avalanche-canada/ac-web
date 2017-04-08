import React from 'react'
import PropTypes from 'prop-types'
import url from 'url'

Phone.propTypes = {
    phone: PropTypes.string.isRequired,
    ext: PropTypes.string,
    title: PropTypes.string,
}

function getChildren(children, phone, ext) {
    if (children) {
        return children
    }

    return `${phone}${ext ?  ` ext. ${ext}` : ''}`
}

export default function Phone({phone, ext, title, children}) {
    const href = url.format({
        protocol: 'tel',
        pathname: phone,
    })

    return (
        <a {...{href, title}}>
            {getChildren(children, phone, ext)}
        </a>
    )
}
