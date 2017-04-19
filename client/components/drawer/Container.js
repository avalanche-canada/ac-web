import React from 'react'
import PropTypes from 'prop-types'
import {compose, setPropTypes, setDisplayName, withState, renameProp, lifecycle, onlyUpdateForKeys} from 'recompose'
import {Motion, spring, presets} from 'react-motion'
import CSSModules from 'react-css-modules'
import {history} from '~/router'
import Cabinet from './Cabinet'
import styles from './Drawer.css'
import noop from 'lodash/noop'
import {findNode, getPath, getParent} from '~/utils/tree'

const preset = presets.noWobble

// Handlers
function handleClick(id, event) {
    event.preventDefault()
    const node = findNode(this.root, id)

    this.setNode(node)
}
function handleContainerClick(event) {
    const {target, currentTarget} = event

    if (target !== currentTarget) {
        return
    }

    this.onClose()
}
function handleClose(id, event) {
    event.preventDefault()

    if (id === this.root.id) {
        this.onClose(id)
    } else {
        this.setNode(getParent(this.root, id))
    }
}
function handleCloseChildren(id, event) {
    event.preventDefault()
    const node = findNode(this.root, id)

    this.setNode(node)
}

function createDrawer({id, children, ...drawer}) {
    return {
        key: id,
        data: {
            ...drawer,
            onClose: handleClose.bind(this, id),
            onClick: handleCloseChildren.bind(this, id),
            children: children.map(item => ({
                ...item,
                onClick: handleClick.bind(this, item.id)
            }))
        }
    }
}

function getStyle({x}) {
    const transform = `translateX(${x * 100}%)`

    return {
        transform,
        WebkitTransform: transform,
    }
}

const defaultStyle = {
    x: -1
}

Animated.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    root: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    setNode: PropTypes.func.isRequired,
}

function Animated({show = false, onClose = noop, root, node, setNode}) {
    const path = getPath(root, node)
    const onRest = show ? noop : onClose
    const context = {node, setNode, root, onClose}
    const drawers = path.reverse().map(createDrawer, context)
    const onClick = handleContainerClick.bind(context)
    const style = {
        x: spring(show ? 0 : -1, preset)
    }

    return (
        <Motion {...{defaultStyle, style, onRest}}>
            {value =>
                <StylishedContainer
                    style={getStyle(value)}
                    onClick={onClick}
                    drawers={drawers} />
            }
        </Motion>
    )
}

Container.propTypes = {
    style: PropTypes.object,
    drawers: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func.isRequired,
}

function Container({style = null, drawers, onClick}) {
    return (
        <div style={style} styleName='Container' onClick={onClick}>
            <Cabinet drawers={drawers} />
        </div>
    )
}

const StylishedContainer = CSSModules(Container, styles)

export default compose(
    setDisplayName('Container'),
    renameProp('menu', 'root'),
    withState('node', 'setNode'),
    onlyUpdateForKeys(['show', 'node']),
    setPropTypes({
        menu: PropTypes.object,
        show: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
    }),
    lifecycle({
        componentDidMount() {
            history.listenBefore(this.props.onClose)
        }
    })
)(Animated)
