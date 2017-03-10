import React, {PropTypes} from 'react'
import {compose, lifecycle, setPropTypes, renderNothing, getContext, defaultProps} from 'recompose'

export const TOP_LEFT = 'top-left'
export const TOP_RIGHT = 'top-right'
export const BOTTOM_LEFT = 'bottom-left'
export const BOTTOM_RIGHT = 'bottom-right'

export default function control(Control) {
    return compose(
        getContext({
            map: PropTypes.object.isRequired,
        }),
        setPropTypes({
            position: PropTypes.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT]),
        }),
        defaultProps({
            position: BOTTOM_RIGHT
        }),
        lifecycle({
            componentDidMount() {
                const {map, position} = this.props
                const control = this.control = new Control()

                map.addControl(control, position)

                // FIXME: Remove this hack once https://github.com/mapbox/mapbox-gl-js/pull/4397
                // gets merged
                if (control._fullscreenButton) {
                    control._fullscreenButton.type = 'button'
                }
            },
            componentWillUnmount() {
                this.props.map.removeControl(this.control)
            }
        }),
    )(renderNothing())
}
