import React, {PropTypes} from 'react'
import {compose, lifecycle, onlyUpdateForKeys, withContext} from 'recompose'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router'
import {Map, Source, Layer, Popup, Marker, Utils} from 'components/map'
import {zoomChanged, centerChanged} from 'actions/map'
import getMapProps from 'selectors/map'
import {Primary, Secondary, Menu, OpenMenu} from './drawers'
import {loadData} from 'actions/map'

// TODO: Improve performance. Way too much rerendering...

function Container({
    sources = [],
    layers = [],
    markers = [],
    primary,
    secondary,
    dispatch,
    zoom,
    center,
    bounds,
    onZoomend,
    onMoveend,
    onClick,
    onMousemove,
    onMarkerClick,
}) {
    const props = {
        zoom,
        center,
        bounds,
        onZoomend,
        onMoveend,
        onClick,
        onMousemove,
    }

    return (
        <div>
            <Map {...props} >
                {sources.map(source => (
                    <Source key={source.id} {...source} />
                ))}
                {layers.map(layer => (
                    <Layer key={layer.id} {...layer} />
                ))}
                {markers.map(marker => (
                    <Marker key={marker.id} {...marker} onClick={onMarkerClick.bind(null, marker)} />
                ))}
            </Map>
            <Primary>
                {primary}
            </Primary>
            <Secondary>
                {secondary}
            </Secondary>
            <OpenMenu />
            <Menu />
        </div>
    )
}

function handleMoveend({target}) {
    return centerChanged(target.getCenter().toArray())
}

function handleZoomend({target}) {
    return zoomChanged(target.getZoom())
}

function mapDispatchToProps(dispatch) {
    const actions = {
        onMoveend: handleMoveend,
        onZoomend: handleZoomend,
        loadData,
    }

    return {
        ...bindActionCreators(actions, dispatch),
        dispatch,
    }
}

function mergeProps(state, {dispatch, ...actions}, props) {
    return {
        ...state,
        ...actions,
        ...props,
        onClick: state.onClick(dispatch),
        onMarkerClick(marker, event) {
            event.stopPropagation()

            const {location, router} = props
            const {pathname, query} = location

            router.push({
                pathname,
                query,
                ...marker.location,
            })
        },
    }
}

function getLocation({location}) {
    return {
        location
    }
}

const context = {
    location: PropTypes.object,
}

export default compose(
    withRouter,
    withContext(context, getLocation),
    connect(getMapProps, mapDispatchToProps, mergeProps),
    onlyUpdateForKeys(['layers', 'sources', 'markers', 'bounds', 'location']),
    lifecycle({
        componentDidMount() {
            this.props.loadData()
        },
    }),
)(Container)
