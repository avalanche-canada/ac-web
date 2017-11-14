import React from 'react'
import PropTypes from 'prop-types'
import { Status as StatusComponent } from 'components/misc'
import { StructuredText } from 'prismic/components/base'
import Status from 'utils/status'

Tutorial.propTypes = {
    status: PropTypes.instanceOf(Status).isRequired,
    tutorial: PropTypes.object,
}

export default function Tutorial({ status, tutorial }) {
    return (
        <div>
            <StatusComponent {...status.toJSON()} />
            {tutorial && <StructuredText value={tutorial.tutorial} />}
        </div>
    )
}
