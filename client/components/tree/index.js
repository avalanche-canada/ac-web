import React, { Component, Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Expand } from 'components/button'
import { Link } from 'react-router-dom'
import styles from './Tree.css'

export default class Tree extends Component {
    static propTypes = {
        children: PropTypes.node,
    }
    render() {
        return <div className={styles.Tree}>{this.props.children}</div>
    }
}

export class Node extends Component {
    static propTypes = {
        label: PropTypes.node,
        link: PropTypes.string,
        onClick: PropTypes.func,
        isExpanded: PropTypes.bool,
        children: PropTypes.node,
        level: PropTypes.number,
    }
    static defaultProps = {
        isExpanded: false,
        level: 0,
    }
    state = {
        isExpanded: this.props.isExpanded,
    }
    get style() {
        return {
            paddingLeft: this.props.level * 15,
        }
    }
    handleExpandClick = event => {
        event.preventDefault()
        event.stopPropagation()
        this.setState(toggle)
    }
    cloneChildNode = node =>
        cloneElement(node, {
            level: this.props.level + 1,
        })
    render() {
        const { isExpanded } = this.state
        const { children, link, onClick } = this.props
        const hasChildren = Children.count(children) > 0

        return (
            <Fragment>
                <Link
                    to={link || '#'}
                    onClick={onClick}
                    style={this.style}
                    className={styles.Node}>
                    <div className={styles.NodeControl}>
                        {hasChildren && (
                            <Expand
                                chevron
                                expanded={isExpanded}
                                onClick={this.handleExpandClick}
                            />
                        )}
                    </div>
                    <div className={styles.Label}>{this.props.label}</div>
                </Link>
                {hasChildren &&
                    isExpanded &&
                    Children.map(children, this.cloneChildNode)}
            </Fragment>
        )
    }
}

// Utils
function toggle({ isExpanded }) {
    return {
        isExpanded: !isExpanded,
    }
}
