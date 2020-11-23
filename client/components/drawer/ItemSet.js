import React from 'react'
import PropTypes from 'prop-types'
import { memo } from 'utils/react'
import Link from 'components/navbar/Link'
import styles from './Drawer.module.css'

ItemSet.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
    children: PropTypes.node,
}

function ItemSet({ items = [], label, to, children }) {
    return (
        <div className={styles['ItemSet--Container']}>
            <ul className={styles.ItemSet}>
                <Item>
                    {to ? (
                        <Link to={to} title={label}>
                            {label}
                        </Link>
                    ) : (
                        label
                    )}
                </Item>
                {items.map(renderItem)}
            </ul>
            {children}
        </div>
    )
}

export default memo.static(ItemSet)

Item.propTypes = {
    children: PropTypes.node.isRequired,
}

function Item({ children }) {
    return <li className={styles.Item}>{children}</li>
}

function renderItem({ to, label, headline, children = [], onClick }, index) {
    return (
        <Item key={index}>
            <Link to={to} title={headline || label} onClick={children.length > 0 ? onClick : null}>
                {label}
            </Link>
        </Item>
    )
}
