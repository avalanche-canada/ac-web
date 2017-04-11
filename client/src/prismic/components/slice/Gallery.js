import React from 'react'
import PropTypes from 'prop-types'
import {TabSet, Tab, LOOSE} from '/components/tab'
import Base from '/components/gallery'

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
        {content.map(({name, ...gallery}, index) => {
            return (
                <Tab key={index} title={name}>
                    <Base {...mapProperties(gallery)} />
                </Tab>
            )
        })}
        </TabSet>
    )
}
