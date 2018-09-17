import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemSet from './ItemSet'
import Toolbar from './Toolbar'
import styles from './Drawer.css'

export default class Drawer extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        home: Toolbar.propTypes.home,
        to: PropTypes.string,
        onClose: PropTypes.func,
        onClick: PropTypes.func,
        style: PropTypes.object,
        children: PropTypes.node.isRequired,
    }
    static defaultProps = {
        onClose() {},
        onClick() {},
        style: null,
    }
    shouldComponentUpdate({ style }) {
        return style !== this.props.style
    }
    handleClick = event => {
        const { target, currentTarget } = event

        if (target !== currentTarget) {
            return
        }

        this.props.onClick(event)
    }
    render() {
        const { label, to, onClose, style, children, home } = this.props

        return (
            <nav
                style={style}
                className={styles.Drawer}
                onClick={this.handleClick}>
                <Toolbar home={home} onClose={onClose} />
                <ItemSet label={label} to={to} items={children} />
            </nav>
        )
    }
}
