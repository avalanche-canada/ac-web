import React, { memo } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import ItemSet from './ItemSet'
import Toolbar from './Toolbar'
import styles from './Drawer.css'

Drawer.propTypes = {
    label: PropTypes.string.isRequired,
    home: Toolbar.propTypes.home,
    to: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
}

function Drawer({ label, to, onClose, onClick = noop, style, children, home }) {
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
