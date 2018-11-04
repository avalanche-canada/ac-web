import React, { Component, Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Link, Location } from '@reach/router'
import Button, { SUBTILE } from 'components/button'
import { ChevronRight } from 'components/icons'
import { GRAY } from 'constants/colors'
import classnames from 'classnames/bind'
import styles from './Tree.css'

Tree.propTypes = {
    children: PropTypes.node,
}

export default function Tree({ children }) {
    return (
        <div className={styles.Tree}>
            <Location>
                {({ location }) =>
                    Children.map(children, node =>
                        cloneElement(node, { location })
                    )
                }
            </Location>
        </div>
    )
}

// TODO: HOOKS

export class Node extends Component {
    static propTypes = {
        label: PropTypes.node.isRequired,
        title: PropTypes.string,
        link: PropTypes.string,
        onClick: PropTypes.func,
        isExpanded: PropTypes.bool,
        children: PropTypes.arrayOf(PropTypes.node),
        level: PropTypes.number,
        location: PropTypes.object.isRequired,
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
    get hasChildren() {
        return Children.count(this.props.children) > 0
    }
    handleExpandClick = event => {
        event.preventDefault()
        event.stopPropagation()
        this.setState(toggle)
    }
    cloneChildNode = node =>
        cloneElement(node, {
            level: this.props.level + 1,
            location: this.props.location,
        })
    getLinkProps = ({ isPartiallyCurrent }) => {
        return {
            className: classNames({
                Node: true,
                Active: isPartiallyCurrent,
            }),
        }
    }
    get isExpanded() {
        const { pathname } = this.props.location
        const { link } = this.props

        return (
            this.state.isExpanded ||
            (pathname.includes(link) && !pathname.endsWith(link))
        )
    }
    render() {
        const { hasChildren, isExpanded } = this
        const { children, link, title, onClick } = this.props

        return (
            <Fragment>
                <Link
                    to={link || '#'}
                    title={title}
                    onClick={onClick}
                    style={this.style}
                    getProps={this.getLinkProps}>
                    <div
                        className={classNames({
                            NodeControl: true,
                            Expanded: isExpanded,
                        })}>
                        {hasChildren && (
                            <Control onClick={this.handleExpandClick} />
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

const classNames = classnames.bind(styles)
