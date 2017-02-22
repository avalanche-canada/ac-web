import React, {PropTypes} from 'react'
import Slice from 'prismic/components/slice'
import {Status} from 'components/misc'

Content.propTypes = {
    document: PropTypes.object,
    status: PropTypes.object,
}

export default function Content({type, uid, document = {}, status}) {
    const {content = []} = document

    return (
        <div className={`${type}-${uid}`}>
            <Status {...status.toJSON()} />
            {content.map(slice => <Slice {...slice} />)}
        </div>
    )
}
