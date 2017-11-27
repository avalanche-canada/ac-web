import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring, presets } from 'react-motion'
import Drawer from './Drawer'

const preset = presets.noWobble

// Motion logic
function willEnter() {
    return {
        x: -1,
    }
}

function willLeave() {
    return {
        x: spring(-1, preset),
    }
}

function getStyles(drawers) {
    return drawers.map(drawer => ({
        ...drawer,
        style: {
            x: spring(0, preset),
        },
    }))
}

function getDefaultStyles(drawers) {
    return drawers.map(drawer => ({
        ...drawer,
        style: {
            x: 0,
        },
    }))
}

function getContainerStyle({ x }) {
    const transform = `translateX(${x * 100}%)`

    return {
        transform,
        WebkitTransform: transform,
    }
}

export default class Cabinet extends Component {
    static propTypes = {
        drawers: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string.isRequired,
                data: PropTypes.shape({
                    onClose: PropTypes.func.isRequired,
                    children: PropTypes.array,
                }),
            })
        ),
    }
    static defaultProps = {
        drawers: [],
    }
    shouldComponentUpdate({ drawers }) {
        return drawers !== this.props.drawers
    }
    render() {
        const { drawers } = this.props
        const styles = getStyles(drawers)
        const defaultStyles = getDefaultStyles(drawers)
        const motion = {
            defaultStyles,
            styles,
            willLeave,
            willEnter,
        }

        return (
            <TransitionMotion {...motion}>
                {configs => (
                    <section>
                        {configs.map(({ key, style, data }) => (
                            <Drawer
                                key={key}
                                style={getContainerStyle(style)}
                                {...data}
                            />
                        ))}
                    </section>
                )}
            </TransitionMotion>
        )
    }
}
