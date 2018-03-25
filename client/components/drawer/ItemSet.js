import React from 'react'
import StaticComponent from 'components/StaticComponent'
import PropTypes from 'prop-types'
import Link from 'components/navbar/Link'
import styles from './Drawer.css'

Item.propTypes = {
    children: PropTypes.node.isRequired,
}

function Item({ children }) {
    return <li className={styles.Item}>{children}</li>
}

export default class ItemSet extends StaticComponent {
    static propTypes = {
        items: PropTypes.node.isRequired,
        label: PropTypes.string.isRequired,
        to: PropTypes.string,
    }
    renderItem({ to, label, headline, children = [], onClick }, index) {
        return (
            <Item key={index}>
                <Link
                    to={to}
                    title={headline || label}
                    onClick={children.length > 0 ? onClick : null}>
                    {label}
                </Link>
            </Item>
        )
    }
    get header() {
        const { label, to } = this.props

        return (
            <Item>
                {to ? (
                    <Link to={to} title={label}>
                        {label}
                    </Link>
                ) : (
                    label
                )}
            </Item>
        )
    }
    render() {
        return (
            <div className={styles['ItemSet--Container']}>
                <ul className={styles.ItemSet}>
                    {this.header}
                    {this.props.items.map(this.renderItem)}
                </ul>
            </div>
        )
    }
}
