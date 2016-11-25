import React, {PropTypes} from 'react'
import CSSModule from 'react-css-modules'
import {compose, withContext, withState, branch, renderComponent} from 'recompose'
import {Primary, Secondary, Menu, OpenMenu} from 'containers/drawers'
import Map from 'containers/Map'
import UnsupportedMap from 'containers/UnsupportedMap'
import styles from './Map.css'
import mapbox from 'services/mapbox/map'

function Layout({primary, setInitializationError}) {
    return (
        <div styleName='Container'>
            <Map onInitializationError={setInitializationError} />
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
    withState('initializationError', 'setInitializationError', false),
    withContext({
        location: PropTypes.object.isRequired,
        routes: PropTypes.array.isRequired,
        params: PropTypes.object.isRequired,
    }, ({location, routes, params}) => ({location, routes, params})),
    branch(
        props => props.initializationError,
        renderComponent(UnsupportedMap),
        Component => Component,
    ),
    CSSModule(styles),
)(Layout) : UnsupportedMap
