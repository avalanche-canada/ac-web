import React, {PropTypes} from 'react'
import {compose, withContext, withState} from 'recompose'
import {Primary, Secondary, Menu, OpenMenu} from 'containers/drawers'
import Map from 'containers/Map'

// TODO: Remove that setMap and map state. It is a workaround to send the map
// object to the map comtrols. Instead, zoomIn and zoomOut actions should be created.
// And Map component reacts to zoom level and center change only. Not to bounds!!!
// This requires few changes with the way map zooms to feature.

function Layout({primary, map, setMap}) {
    return (
        <div>
            <Map onLoad={setMap} />
            <Primary>
                {primary}
            </Primary>
            <Secondary />
            <OpenMenu />
            <Menu />
        </div>
    )
}

export default compose(
    withState('map', 'setMap', null),
    withContext({
        location: PropTypes.object.isRequired,
        routes: PropTypes.array.isRequired,
        params: PropTypes.object.isRequired,
        map: PropTypes.object.isRequired,
    }, ({location, routes, params, map}) => ({location, routes, params, map}))
)(Layout)
