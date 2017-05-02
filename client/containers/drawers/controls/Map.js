import React from 'react'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import CSSModule from 'react-css-modules'
import { neverUpdate } from '~/compose'
import { zoomIn, zoomOut } from '~/actions/map'
import { computeOffset } from '~/selectors/map/bounds'
import { Remove, Add } from '~/components/icons'
import Button, { SUBTILE } from '~/components/button'
import styles from './Map.css'

// TODO: Probably use the mapboxgl zoom control
// TODO: Eventually remove that controls...

ZoomControl.propTypes = {
    zoomIn: PropTypes.func.isRequired,
    zoomOut: PropTypes.func.isRequired,
}

function ZoomControl({ zoomIn, zoomOut }) {
    return (
        <div styleName="ZoomControl">
            <Button
                onClick={zoomIn}
                kind={SUBTILE}
                icon={<Add />}
                title="Zoom in"
            />
            <Button
                onClick={zoomOut}
                kind={SUBTILE}
                icon={<Remove />}
                title="Zoom out"
            />
        </div>
    )
}

export default compose(
    connect(
        createStructuredSelector({
            computeOffset,
        }),
        {
            zoomIn,
            zoomOut,
        }
    ),
    withHandlers({
        zoomIn: props => () => {
            props.zoomIn({
                offset: props.computeOffset(),
            })
        },
        zoomOut: props => () => {
            props.zoomOut({
                offset: props.computeOffset(),
            })
        },
    }),
    neverUpdate,
    CSSModule(styles)
)(ZoomControl)
