import React from 'react'
import PropTypes from 'prop-types'
import {InnerHTML} from 'components/misc'
import {Status as StatusComponent} from 'components/misc'
import Status from '/utils/status'

Tutorial.propTypes = {
    status: PropTypes.instanceOf(Status).isRequired,
    tutorial: PropTypes.string.isRequired,
}

export default function Tutorial({status, tutorial = {}}) {
    return (
        <div>
            <StatusComponent {...status.toJSON()} />
            <InnerHTML>
                {tutorial.tutorial}
            </InnerHTML>
        </div>
    )
}
