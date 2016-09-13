import React, {PropTypes} from 'react'
import {TabSet, Tab, LOOSE} from 'components/tab'
import Base from 'components/gallery'

const YES = 'Yes'
const NO = 'No'

function mapProperties({tag, fullScreen, playPause}) {
    return {
        tag,
        fullScreen: fullScreen === YES,
        playPause: playPause === YES,
    }
}

export default function Gallery({content, label}) {
    if (content.length === 1) {
        const [gallery] = content

        return (
            <Base {...mapProperties(gallery)} />
        )
    }

    return (
        <TabSet theme={LOOSE}>
        {content.map(({name, ...gallery}) => {
            return (
                <Tab title={name}>
                    <Base {...mapProperties(gallery)} />
                </Tab>
            )
        })}
        </TabSet>
    )
}
