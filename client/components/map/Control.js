import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WithMap } from './context'

export const TOP_LEFT = 'top-left'
export const TOP_RIGHT = 'top-right'
export const BOTTOM_LEFT = 'bottom-left'
export const BOTTOM_RIGHT = 'bottom-right'

// TODO: HOOKS

Control.propTypes = {
    controlClass: PropTypes.func.isRequired,
    position: PropTypes.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT]),
}

export default function Control(props) {
    return (
        <WithMap>
            <InnerControl {...props} />
        </WithMap>
    )
}

class InnerControl extends Component {
    static defaultProps = {
        position: BOTTOM_RIGHT,
    }
    componentDidMount() {
        const { position, controlClass, map, ...props } = this.props
        const control = new controlClass(props)

        map.addControl(control, position)
    }
    render() {
        return null
    }
}
