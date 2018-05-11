import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Tree.css'

export class Tree extends Component {
    render() {
        return <div className={styles.Tree}>{this.props.children}</div>
    }
}

export class TreeItem extends Component {
    static propTypes = {
        level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
        children: PropTypes.node.isRequired,
    }
    static defaultProps = {
        level: 1,
    }
    get style() {
        return {
            paddingLeft: this.props.level * 10,
        }
    }
    render() {
        return (
            <div className={styles.TreeItem} style={this.style}>
                {this.props.children}
            </div>
        )
    }
}
