import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { findNode, getPath, getParent } from 'utils/tree'
import Drawer from './Drawer'
import styles from './Drawer.module.css'

Layout.propTypes = {
    menu: PropTypes.object,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

function Layout({ menu, ...props }) {
    const [node, setNode] = useState(null)

    return <Container root={menu} node={node} {...props} setNode={setNode} />
}

export default memo(Layout, (prevProps, nextProps) => prevProps.show === nextProps.show)

Container.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    root: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    setNode: PropTypes.func.isRequired,
}

function Container({ show = false, node, onClose, root, setNode }) {
    const path = getPath(root, node)
    const context = { setNode, root, onClose }
    const drawers = path.reverse().map(createDrawer, context)
    const className = classnames(styles.Container, {
        [styles.Open]: show,
    })
    function handleContainerClick(event) {
        const { target, currentTarget } = event

        if (target !== currentTarget) {
            return
        }

        onClose()
    }

    return (
        <div className={className} onClick={handleContainerClick}>
            {drawers.map(drawer => (
                <Drawer key={drawer.id} {...drawer} />
            ))}
        </div>
    )
}

// Utils
function createDrawer(drawer) {
    const { root, setNode, onClose } = this
    const { id, children } = drawer

    return {
        ...drawer,
        home: {
            to: root.to,
            label: root.label,
        },
        onClose(event) {
            event.preventDefault()

            if (id === root.id) {
                onClose(id)
            } else {
                setNode(getParent(root, id))
            }
        },
        onClick(event) {
            event.preventDefault()
            const node = findNode(root, id)

            setNode(node)
        },
        children: Array.isArray(children)
            ? children.map(item => ({
                  ...item,
                  onClick(event) {
                      event.preventDefault()
                      const node = findNode(root, item.id)

                      setNode(node)
                  },
              }))
            : children,
    }
}
