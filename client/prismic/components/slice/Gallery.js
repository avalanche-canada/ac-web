import React from 'react'
import PropTypes from 'prop-types'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { CloudinaryGallery } from 'components/gallery'

function mapProperties({ tag, fullScreen, playPause }) {
    return {
        tag,
        fullScreen: fullScreen === 'Yes',
        playPause: playPause === 'Yes',
    }
}

function renderHeader({ name }, index) {
    return <Header key={index}>{name}</Header>
}

function renderPanel(gallery, index) {
    return (
        <Panel key={index}>
            <CloudinaryGallery {...mapProperties(gallery)} />
        </Panel>
    )
}

Gallery.propTypes = {
    value: PropTypes.arrayOf(PropTypes.object),
}

export default function Gallery({ value }) {
    if (value.length === 1) {
        const [gallery] = value

        return <CloudinaryGallery {...mapProperties(gallery)} />
    }

    return (
        <Tabs theme="LOOSE">
            <HeaderSet>{value.map(renderHeader)}</HeaderSet>
            <PanelSet>{value.map(renderPanel)}</PanelSet>
        </Tabs>
    )
}
