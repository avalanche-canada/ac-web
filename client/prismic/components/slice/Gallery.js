import React from 'react'
import PropTypes from 'prop-types'
import { TabSet, Tab, LOOSE } from '~/components/tab'
import { CloudinaryGallery } from '~/components/gallery'

function mapProperties({ tag, fullScreen, playPause }) {
    return {
        tag,
        fullScreen: fullScreen === 'Yes',
        playPause: playPause === 'Yes',
    }
}

Gallery.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
}

export default function Gallery({ content }) {
    if (content.length === 1) {
        const [gallery] = content

        return <CloudinaryGallery {...mapProperties(gallery)} />
    }

    return (
        <TabSet theme={LOOSE}>
            {content.map(({ name, ...gallery }, index) => {
                return (
                    <Tab key={index} title={name}>
                        <CloudinaryGallery {...mapProperties(gallery)} />
                    </Tab>
                )
            })}
        </TabSet>
    )
}
