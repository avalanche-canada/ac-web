import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { pathname } from 'router/prismic'
import { Loading } from 'components/text'
import { Document } from 'prismic/containers'
import * as params from 'prismic/params'

DocumentLink.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    isBroken: PropTypes.bool.isRequired,
    children: PropTypes.node,
}

export default function DocumentLink({ children, isBroken, ...props }) {
    const { type, uid } = props

    return (
        <Link to={pathname(props)} {...props}>
            {children || (
                <Document {...params.uid(type, uid)}>{renderer}</Document>
            )}
        </Link>
    )
}

// Utils
function renderer({ document }) {
    return document?.data?.title || <Loading />
}
