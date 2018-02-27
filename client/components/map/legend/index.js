import React, { Component, PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

export class Entry extends Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
    }
    render() {
        const children = Children.toArray(this.props.children)

        return (
            <div className={styles.Entry}>
                {children.find(isSymbol)}
                <div className={styles.Explanation}>
                    {children.filter(isNotSymbol)}
                </div>
            </div>
        )
    }
}

export class Symbol extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }
    render() {
        const { children, ...props } = this.props

        return (
            <div className={styles.Symbol} {...props}>
                {children}
            </div>
        )
    }
}

export class Name extends PureComponent {
    static propTypes = {
        children: PropTypes.string.isRequired,
    }
    render() {
        return <div className={styles.Name}>{this.props.children}</div>
    }
}

export class Description extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }
    render() {
        return <div className={styles.Description}>{this.props.children}</div>
    }
}

// Utils
function isSymbol({ type }) {
    return type === Symbol
}
function isNotSymbol({ type }) {
    return type !== Symbol
}
