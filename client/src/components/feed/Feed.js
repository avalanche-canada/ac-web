import React, {PropTypes} from 'react'
import {Status} from 'components/misc'
import EntrySet from './EntrySet'
import Entry from './Entry'

Feed.propTypes = {
    content: PropTypes.array,
    status: PropTypes.object,
}

export default function Feed({content = [], status}) {
    return (
        <div>
            <Status {...status.toJSON()} />
            <EntrySet>
                {content.map(entry => <Entry key={entry.uid} {...entry} />)}
            </EntrySet>
        </div>
    )
}
