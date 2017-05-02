import React from 'react'
import PropTypes from 'prop-types'
import { Status as StatusComponent } from '~/components/misc'
import EntrySet from './EntrySet'
import Entry from './Entry'
import Status from '~/utils/status'

Feed.propTypes = {
    content: PropTypes.array,
    status: PropTypes.instanceOf(Status),
}

export default function Feed({ content = [], status }) {
    return (
        <div>
            <StatusComponent {...status.toJSON()} />
            <EntrySet>
                {content.map(entry => <Entry key={entry.uid} {...entry} />)}
            </EntrySet>
        </div>
    )
}
