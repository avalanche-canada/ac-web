import React, { Component, Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Route, NavLink } from 'react-router-dom'
import Button, { SUBTILE } from 'components/button'
import { ChevronRight } from 'components/icons'
import { GRAY } from 'constants/colors'
import classnames from 'classnames/bind'
import styles from './Tree.css'

const classNames = classnames.bind(styles)

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
        label: PropTypes.node.isRequired,
        title: PropTypes.string,
        link: PropTypes.string,
        onClick: PropTypes.func,
        isExpanded: PropTypes.bool,
        children: PropTypes.arrayOf(PropTypes.node),
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
        let { isExpanded } = this.state
        const { children, link, title, onClick } = this.props
        const hasChildren = Children.count(children) > 0

        return (
            <Route>
                {({ location }) => {
                    if (!isExpanded && location.pathname !== link) {
                        isExpanded = location.pathname.startsWith(link)
                    }

                    return (
                        <Fragment>
                            <NavLink
                                to={link || '#'}
                                title={title}
                                onClick={onClick}
                                style={this.style}
                                activeClassName={styles.Active}
                                className={styles.Node}>
                                <div
                                    className={classNames({
                                        NodeControl: true,
                                        Expanded: isExpanded,
                                    })}>
                                    {hasChildren && (
                                        <Control
                                            onClick={this.handleExpandClick}
                                        />
                                    )}
                                </div>
                                <div className={styles.Label}>
                                    {this.props.label}
                                </div>
                            </NavLink>
                            {hasChildren &&
                                isExpanded &&
                                Children.map(children, this.cloneChildNode)}
                        </Fragment>
                    )
                }}
            </Route>
        )
    }
}

// Utils
function Control(props) {
    return (
        <Button kind={SUBTILE} {...props}>
            <ChevronRight color={GRAY} />
        </Button>
    )
}
function toggle({ isExpanded }) {
    return {
        isExpanded: !isExpanded,
    }
}
