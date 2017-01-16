import React, {PropTypes} from 'react'
import {Muted} from 'components/misc'
import EntrySet from './EntrySet'
import Entry from './Entry'

Section.propTypes = {
    content: PropTypes.array,
    message: PropTypes.string,
}

export default function Section({message, content = []}) {
    return (
        <div>
            <Muted>{message}</Muted>
            <EntrySet>
                {content.map(entry => <Entry key={entry.uid} {...entry} />)}
            </EntrySet>
        </div>
    )
}
