import React, { PropTypes, Children, cloneElement, createElement} from 'react'
import {compose, setDisplayName, withState, mapProps, setPropTypes} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import Drawer from './Drawer'
import ItemSet from './ItemSet'
import Item from './Item'
import Link from './Link'
import {TransitionMotion, spring, presets} from 'react-motion'

const preset = presets.noWobble

function K() {}

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
    return drawers.map((drawer, index) => ({
        ...drawer,
        style: {
            x: spring(0, preset),
        }
    }))
}
function getDefaultStyles(drawers) {
    return drawers.map((drawer, index) => ({
        ...drawer,
        style: {
            x: 0,
        }
    }))
}

function getDrawerStyle({x}) {
    return {
        transform: `translateX(${x * 100}%)`
    }
}

Cabinet.propTypes = {
    drawers: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        data: PropTypes.shape({
            onClose: PropTypes.func.isRequired,
            children: PropTypes.arrayOf(PropTypes.node).isRequired,
        })
    })),
}

function Cabinet({ drawers = [] }) {
    const styles = getStyles(drawers)
    const defaultStyles = getDefaultStyles(drawers)

    return (
        <TransitionMotion {...{defaultStyles, styles, willLeave, willEnter}}>
            {configs => (
                <section>
                {configs.map(({key, style, data: {children, label, ...drawer}}) =>
                    <Drawer key={key} style={getDrawerStyle(style)} {...drawer}>
                        <ItemSet key={key}>
                            <Item>{label}</Item>
                            {children.map(({to, label, headline, children, onClick}, index) =>
                                <Item key={index}>
                                    <Link to={to} title={headline || label} onClick={children && onClick}>
                                        {label}
                                    </Link>
                                </Item>
                            )}
                        </ItemSet>
                    </Drawer>
                )}
                </section>
            )}
        </TransitionMotion>
    )
}

export default CSSModules(Cabinet, styles)
