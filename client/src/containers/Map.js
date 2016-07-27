import React from 'react'
import {compose, lifecycle, onlyUpdateForKeys} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Map, Source, Layer, Popup, Marker, Utils} from 'components/map'
import {zoomChanged, centerChanged} from 'actions/map'
import {getMapProps} from 'selectors/map'
import {Primary, Secondary, Menu} from './Drawers'
import {loadData} from 'actions/map'

function handleMoveend({target}) {
    return centerChanged(target.getCenter().toArray())
}
function handleZoomend({target}) {
    return zoomChanged(target.getZoom())
}

function Container({moveend, zoomend, sources = [], layers = [], markers = [], state, action, primary, secondary}) {
    const events = {
        moveend,
        zoomend,
    }

    return (
        <div>
            <Map events={events} {...state} action={action}>
                {sources.map(source => <Source key={source.id} {...source} />)}
                {layers.map(layer => <Layer key={layer.id} {...layer} />)}
                {markers.map(marker => <Marker key={marker.id} {...marker} />)}
            </Map>
            <Primary>
                {primary}
            </Primary>
            <Secondary>
                {secondary}
            </Secondary>
            <Menu />
        </div>
    )
}

export default compose(
    withRouter,
    connect(getMapProps, {
        moveend: handleMoveend,
        zoomend: handleZoomend,
        loadData,
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadData()
        },
        componentDidUpdate() {
            this.props.loadData()
        }
    }),
    onlyUpdateForKeys(['layers', 'sources', 'markers', 'state']),
)(Container)
