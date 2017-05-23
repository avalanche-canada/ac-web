import React from 'react'
import PropTypes from 'prop-types'
import { Status } from '~/components/misc'

// TODO: Look if still using that compoenent

Content.propTypes = {
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    document: PropTypes.object,
    // TODO: USe appropriate propTypes
    status: PropTypes.object,
}

export default function Content({
    type,
    uid,
    document: { content = [] } = {},
    status,
}) {
    return (
        <div className={`${type}-${uid}`}>
            <Status {...status.toJSON()} />
            {content}
        </div>
    )
}
