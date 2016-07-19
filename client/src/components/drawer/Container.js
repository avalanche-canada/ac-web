import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {Motion, spring, presets} from 'react-motion'
import {compose, setPropTypes, setDisplayName, withState, renameProp, lifecycle} from 'recompose'
import styles from './Drawer.css'
import TreeModel from 'tree-model'
import Cabinet from './Cabinet'
import Drawer from './Drawer'
import Item from './Item'
import Link from './Link'
import {history} from 'router'

const preset = presets.noWobble

function K() {}

// Tree manipulation
function first(node, id) {
    return node.first(node => node.model.id === id)
}

// Handlers
function handleClick(id, event) {
    event.preventDefault()
    const node = first(this.root, id)

    this.setNode(node)
}
function handleContainerClick(event) {
    event.preventDefault()
    const { target, currentTarget } = event

    if (target !== currentTarget) {
        return
    }

    this.onClose()
}
function handleClose(id, event) {
    event.preventDefault()
    const node = first(this.root, id)

    if (node.isRoot()) {
        this.onClose()
    } else {
        this.setNode(node.parent)
    }
}
function handleCloseChildren(id, event) {
    event.preventDefault()
    const node = first(this.root, id)

    this.setNode(node)
}

function drawerCreator({ model: {id, children, ...drawer} }) {
    return {
        key: id,
        data: {
            ...drawer,
            onClose: handleClose.bind(this, id),
            onClick: handleCloseChildren.bind(this, id),
            onHome: this.onClose,
            children: children.map(item => ({
                ...item,
                onClick: handleClick.bind(this, item.id)
            }))
        }
    }
}

function itemCreator({ id, to, label }) {
    return (
        <Item>
            <Link to={to} onClick={handleClick.bind(this, id)}>
                {label}
            </Link>
        </Item>
    )
}

function getPath(root, node) {
    let path = [root]

    if (node) {
        const { id } = node.model

        path = first(root, id).getPath().reverse()
    }

    return path
}

function getStyle({ x }) {
    return {
        transform: `translateX(${x * 100}%)`
    }
}

const defaultStyle = {
    x: -1
}

function Animated({show = false, onClose = K, node, setNode, root}) {
    const props = {onClose, node, setNode, root}
    const onRest = show ? K : onClose
    const style = {
        x: spring(show ? 0 : -1, preset)
    }

    return (
        <Motion {...{defaultStyle, style, onRest}}>
            {value => <StylishedContainer style={getStyle(value)} {...props} />}
        </Motion>
    )
}

function Container({style = null, node, setNode, root, onClose}) {
    const path = getPath(root, node)
    const context = { node, setNode, root, onClose }

    return (
        <div style={style} styleName='Container' onClick={handleContainerClick.bind(context)}>
            <Cabinet drawers={path.map(drawerCreator, context)} />
        </div>
    )
}

const StylishedContainer = CSSModules(Container, styles)

export default compose(
    setDisplayName('Container'),
    renameProp('menu', 'root'),
    withState('node', 'setNode'),
    setPropTypes({
        menu: PropTypes.object.isRequired,
        show: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
    }),
    lifecycle({
        componentDidMount() {
            history.listenBefore(this.props.onClose)
        }
    })
)(Animated)
