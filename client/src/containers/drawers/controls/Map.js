import React, {PropTypes} from 'react'
import {createStructuredSelector} from 'reselect'
import {compose, defaultProps, withHandlers, getContext, mapProps} from 'recompose'
import {onlyUpdateForKey} from 'compose'
import {connect} from 'react-redux'
import {zoomChanged} from 'actions/map'
import {computeOffset} from 'selectors/map/bounds'
import {Remove, Add} from 'components/icons'
import Base, {SUBTILE} from 'components/button'

const actions = {
    zoomChanged
}

const Button = compose(
    getContext({
        map: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    }),
    connect(createStructuredSelector({
        computeOffset
    }), actions),
    defaultProps({
        kind: SUBTILE,
        inverse: true,
        style: {
            backgroundColor: 'white',
            outline: 'none',
        }
    }),
    withHandlers({
        onClick: props => event => {
            const {map, increment, zoomChanged, computeOffset} = props

            if (!map) {
                return
            }

            const zoom = map.getZoom() + increment
            const offset = computeOffset()

            map.easeTo({zoom, offset})
            zoomChanged(zoom)
        }
    }),
    mapProps(({increment, ...props}) => ({
        ...props,
        icon: increment > 0 ? <Add /> : <Remove />,
    })),
    onlyUpdateForKey('map'),
)(Base)

const STYLE = {
    position: 'absolute',
    display: 'flex',
    bottom: 15,
    left: -55,
    zIndex: 2,
    flexDirection: 'column',
}

export default function Control() {
    return (
        <div style={STYLE} >
            <Button increment={1} title='Zoom in' />
            <Button increment={-1} title='Zoom out' />
        </div>
    )
}
