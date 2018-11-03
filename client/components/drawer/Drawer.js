import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ItemSet from './ItemSet'
import Toolbar from './Toolbar'
import styles from './Drawer.css'

Drawer.propTypes = {
    label: PropTypes.string.isRequired,
    home: Toolbar.propTypes.home,
    to: PropTypes.string,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
}
Drawer.defaultProps = {
    onClose() {},
    onClick() {},
    style: null,
}

function Drawer({ label, to, onClose, onClick, style, children, home }) {
    function handleClick(event) {
        const { target, currentTarget } = event

        if (target !== currentTarget) {
            return
        }

        onClick(event)
    }

    return (
        <nav style={style} className={styles.Drawer} onClick={handleClick}>
            <Toolbar home={home} onClose={onClose} />
            <ItemSet label={label} to={to} items={children} />
        </nav>
    )
}

export default memo(Drawer, (prev, next) => prev.style === next.style)
