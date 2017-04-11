import React from 'react'
import PropTypes from 'prop-types'
import {compose, setDisplayName, withState, mapProps, setPropTypes} from 'recompose'
import {onlyUpdateForKey} from '/compose'
import {TransitionMotion, spring, presets} from 'react-motion'
import CSSModules from 'react-css-modules'
import Drawer from './Drawer'
import styles from './Drawer.css'

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
        }
    }))
}
function getDefaultStyles(drawers) {
    return drawers.map(drawer => ({
        ...drawer,
        style: {
            x: 0,
        }
    }))
}
function getContainerStyle({x}) {
    const transform = `translateX(${x * 100}%)`

    return {
        transform,
        WebkitTransform: transform,
    }
}

Cabinet.propTypes = {
    drawers: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        data: PropTypes.shape({
            onClose: PropTypes.func.isRequired,
            children: PropTypes.array,
        })
    })),
}

function Cabinet({drawers = []}) {
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
                {configs.map(({key, style, data}) => (
                    <Drawer
                        key={key}
                        style={getContainerStyle(style)}
                        {...data} />
                ))}
            </section>
            )}
        </TransitionMotion>
    )
}

export default compose(
    onlyUpdateForKey('drawers'),
    CSSModules(styles),
)(Cabinet)
