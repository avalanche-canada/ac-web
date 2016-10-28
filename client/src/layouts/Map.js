import React, {PropTypes} from 'react'
import CSSModule from 'react-css-modules'
import {compose, withContext, withState, branch, renderComponent} from 'recompose'
import {Primary, Secondary, Menu, OpenMenu} from 'containers/drawers'
import Map from 'containers/Map'
import UnsupportedMap from 'containers/UnsupportedMap'
import styles from './Map.css'
import mapbox from 'services/mapbox/map'

// TODO: Remove that setMap and map state. It is a workaround to send the map
// object to the map comtrols. Instead, zoomIn and zoomOut actions should be created.
// And Map component reacts to zoom level and center change only. Not to bounds!!!
// This requires few changes with the way map zooms to feature.

function Layout({primary, map, setMap, setInitializationError}) {
    return (
        <div styleName='Container'>
            <Map onLoad={setMap} onInitializationError={setInitializationError} />
            <Primary>
                {primary}
            </Primary>
            <Secondary />
            <OpenMenu />
            <Menu />
        </div>
    )
}

export default mapbox.supported() ? compose(
    withState('map', 'setMap', null),
    withState('initializationError', 'setInitializationError', false),
    withContext({
        location: PropTypes.object.isRequired,
        routes: PropTypes.array.isRequired,
        params: PropTypes.object.isRequired,
        map: PropTypes.object.isRequired,
    }, ({location, routes, params, map}) => ({location, routes, params, map})),
    branch(
        props => props.initializationError,
        renderComponent(UnsupportedMap),
        Component => Component,
    ),
    CSSModule(styles),
)(Layout) : UnsupportedMap
