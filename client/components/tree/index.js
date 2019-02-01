import React, { useState, Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Link, Location } from '@reach/router'
import memoize from 'lodash/memoize'
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

Node.propTypes = {
    label: PropTypes.node.isRequired,
    title: PropTypes.string,
    link: PropTypes.string,
    onClick: PropTypes.func,
    isExpanded: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.node),
    level: PropTypes.number,
    location: PropTypes.object.isRequired,
}

export function Node({
    isExpanded = false,
    level = 0,
    children,
    link,
    title,
    onClick,
    label,
    location,
}) {
    const [expanded, setExpanded] = useState(isExpanded)
    const hasChildren = Children.count(children) > 0
    const finalIsExpanded =
        expanded ||
        (location.pathname.includes(link) && !location.pathname.endsWith(link))

    return (
        <Fragment>
            <Link
                to={link || '#'}
                title={title}
                onClick={onClick}
                style={getNodeStyle(level)}
                getProps={getLinkProps}>
                <div
                    className={classNames({
                        NodeControl: true,
                        Expanded: finalIsExpanded,
                    })}>
                    {hasChildren && (
                        <Control
                            onClick={event => {
                                event.preventDefault()
                                event.stopPropagation()
                                setExpanded(!expanded)
                            }}
                        />
                    )}
                </div>
                <div className={styles.Label}>{label}</div>
            </Link>
            {hasChildren &&
                finalIsExpanded &&
                Children.map(children, node =>
                    cloneElement(node, {
                        level: level + 1,
                        location: location,
                    })
                )}
        </Fragment>
    )
}

// Utils
function Control(props) {
    return (
        <Button kind={SUBTILE} {...props}>
            <ChevronRight color={GRAY} />
        </Button>
    )
}
const getNodeStyle = memoize(level => ({
    paddingLeft: level * 15,
}))
function getLinkProps({ isPartiallyCurrent }) {
    return {
        className: classNames({
            Node: true,
            Active: isPartiallyCurrent,
        }),
    }
}
const classNames = classnames.bind(styles)
