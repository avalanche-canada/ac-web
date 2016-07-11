import React from 'react'
import {compose, lifecycle, onlyUpdateForKeys} from 'recompose'
import {connect} from 'react-redux'
import {Map, Source, Layer, Popup, Utils} from 'components/map'
import {zoomChanged, centerChanged} from 'actions/map'
import {getMapProps} from 'selectors/map'
import {loadForecastRegions, loadHotZoneAreas} from 'actions/entities'

function handleMoveend({target}) {
    return centerChanged(target.getCenter().toArray())
}
function handleZoomend({target}) {
    return zoomChanged(target.getZoom())
}

function MapContainer({moveend, zoomend, sources, layers, state, primary, action}) {
    const events = {
        moveend,
        zoomend,
    }

    return (
        <div>
            <Map events={events} {...state} action={action}>
                {sources.map(source => <Source key={source.id} {...source} />)}
                {layers.map(layer => <Layer key={layer.id} {...layer} />)}
            </Map>
            {primary}
        </div>
    )
}

export default compose(
    connect(getMapProps, {
        moveend: handleMoveend,
        zoomend: handleZoomend,
        loadForecastRegions,
        loadHotZoneAreas,
    }),
    lifecycle({
        componentDidMount() {
            const {loadForecastRegions, loadHotZoneAreas} = this.props

            loadForecastRegions()
            loadHotZoneAreas()
        }
    }),
    onlyUpdateForKeys(['children', 'layers', 'sources', 'action']),
)(MapContainer)
