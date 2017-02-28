import React, {PropTypes} from 'react'
import {compose, lifecycle, getContext} from 'recompose'

export const TOP_LEFT = 'top-left'
export const TOP_RIGHT = 'top-right'
export const BOTTOM_LEFT = 'bottom-left'
export const BOTTOM_RIGHT = 'bottom-right'

export default function control(Control) {
    return compose(
        setContextTypes({
            position: PropTypes.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT]),
        }),
        getContext({
            map: PropTypes.object.isRequired,
        }),
        lifecycle({
            componentDidMount() {
                const {map, position} = this.props

                this.control = new Control()

                map.addControl(this.control, position)
            },
            componentWillUnmount() {
                this.props.map.removeControl(this.control)
            }
        })
    )
}
