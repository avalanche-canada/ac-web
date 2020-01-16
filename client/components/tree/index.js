import React, { useState, Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import Button, { SUBTILE } from 'components/button'
import { ChevronRight } from 'components/icons'
import { GRAY } from 'constants/colors'
import classnames from 'classnames'
import { useLocation } from 'router/hooks'
import css from './Tree.css'

Tree.propTypes = {
    children: PropTypes.node,
}

export default function Tree({ children }) {
    return <div className={css.Tree}>{children}</div>
}

Node.propTypes = {
    label: PropTypes.node.isRequired,
    title: PropTypes.string,
    link: PropTypes.string,
    onClick: PropTypes.func,
    isExpanded: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.node),
    level: PropTypes.number,
}

export function Node({
    isExpanded = false,
    level = 0,
    children,
    link,
    title,
    onClick,
    label,
}) {
    const { location } = useLocation()
    const { pathname } = location
    const [expanded, setExpanded] = useState(isExpanded)
    const hasChildren = Children.count(children) > 0
    const finalIsExpanded =
        expanded || (pathname.includes(link) && !pathname.endsWith(link))
    function getLinkProps({ isPartiallyCurrent }) {
        return {
            className: classnames({
                [css.Node]: true,
                [css.Active]: isPartiallyCurrent,
                [css['Node--Level' + level]]: true,
            }),
        }
    }

    return (
        <Fragment>
            <Link
                to={link || '#'}
                title={title}
                onClick={onClick}
                getProps={getLinkProps}>
                <div
                    className={classnames({
                        [css.NodeControl]: true,
                        [css.Expanded]: finalIsExpanded,
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
                <div className={css.Label}>{label}</div>
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
