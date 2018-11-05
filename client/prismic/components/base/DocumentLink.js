import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { pathname } from 'utils/prismic'
import { Loading } from 'components/text'
import { Document } from 'prismic/containers'
import * as params from 'prismic/params'

DocumentLink.propTypes = {
    value: PropTypes.shape({
        document: PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            uid: PropTypes.string.isRequired,
        }).isRequired,
        isBroken: PropTypes.bool.isRequired,
    }).isRequired,
    document: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    }),
    children: PropTypes.node,
}

function DocumentLink({ children, value, document, ...props }) {
    const { type, uid } = value.document

    return (
        <Link to={pathname(value.document)} {...props}>
            {children || (
                <Document {...params.uid(type, uid)}>{renderer}</Document>
            )}
        </Link>
    )
}

export default memo(DocumentLink)

// Utils
function renderer({ document }) {
    return document?.data?.title || <Loading />
}
