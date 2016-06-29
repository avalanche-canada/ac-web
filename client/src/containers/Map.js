import React from 'react'
import {compose, onlyUpdateForKeys} from 'recompose'
import {connect} from 'react-redux'
import {Map, Source, Layer, Popup, Utils} from 'components/map'
import {zoomChanged, centerChanged} from 'actions/map'
import {getMapProps} from 'selectors/map'

function handleMoveend({target}) {
    centerChanged(target.getCenter().toArray())
}
function handleZoomend({target}) {
    zoomChanged(target.getZoom())
}

function MapContainer({moveend, zoomend, sources, layers, state, children, bounds}) {
    const events = {
        moveend,
        zoomend,
    }

    return (
        <div>
            <Map events={events} {...state} bounds={bounds} >
                {sources.map(source => <Source key={source.id} {...source} />)}
                {layers.map(layer => <Layer key={layer.id} {...layer} />)}
            </Map>
            {children}
        </div>
    )
}

export default compose(
    connect(getMapProps, {
        moveend: handleMoveend,
        zoomend: handleZoomend,
    }),
    onlyUpdateForKeys(['children', 'layers', 'sources', 'bounds']),
)(MapContainer)
