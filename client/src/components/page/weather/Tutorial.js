import React, {PropTypes} from 'react'
import {InnerHTML} from 'components/misc'
import {Status as StatusComponent} from 'components/misc'
import Status from 'utils/status'

Tutorial.propTypes = {
    status: PropTypes.instanceOf(Status).isRequired,
    body: PropTypes.string.isRequired,
}

export default function Tutorial({status = new Status(), body}) {
    return (
        <div>
            <StatusComponent {...status.toJSON()} />
            <InnerHTML>
                {body}
            </InnerHTML>
        </div>
    )
}
