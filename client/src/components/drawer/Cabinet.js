import React, { PropTypes, Children, cloneElement, createElement} from 'react'
import {compose, setDisplayName, withState, mapProps, setPropTypes, onlyUpdateForKeys} from 'recompose'
import {TransitionMotion, spring, presets} from 'react-motion'
import CSSModules from 'react-css-modules'
import Drawer from './Drawer'
import ItemSet from './ItemSet'
import Item from './Item'
import Link from 'components/navbar/Link'
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
            children: PropTypes.array,
        })
    })),
}

function Cabinet({drawers = []}) {
    const styles = getStyles(drawers)
    const defaultStyles = getDefaultStyles(drawers)

    return (
        <TransitionMotion defaultStyles={defaultStyles} styles={styles} willLeave={willLeave} willEnter={willEnter} >
            {configs => (
                <section>
                {configs.map(({key, style, data: {children, label, ...drawer}}) =>
                    <Drawer key={key} style={getDrawerStyle(style)} {...drawer}>
                        <ItemSet>
                            <Item>{label}</Item>
                            {children.map(({to, label, headline, children = [], onClick}, index) => {
                                const link = {
                                    to,
                                    title: headline || label,
                                }

                                if (children.length > 0) {
                                    link.onClick = onClick
                                }

                                return (
                                    <Item key={index}>
                                        <Link {...link}>
                                            {label}
                                        </Link>
                                    </Item>
                                )
                            })}
                        </ItemSet>
                    </Drawer>
                )}
                </section>
            )}
        </TransitionMotion>
    )
}

export default compose(
    onlyUpdateForKeys(['drawers']),
    CSSModules(styles),
)(Cabinet)
