import React, { Children, cloneElement, Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './Table.css'
import { Expand } from 'components/button'
import { useToggle } from 'hooks'

Row.propTypes = {
    children: PropTypes.node.isRequired,
    controlled: PropTypes.bool,
    onClick: PropTypes.func,
}

export default function Row({ children, controlled, onClick }) {
    const className = classnames({
        [css.Row]: true,
        [css['Row--Controlled']]: controlled,
        [css['Row--Clickable']]: typeof onClick === 'function',
    })

    return (
        <tr className={className} onClick={onClick}>
            {children}
        </tr>
    )
}

Expandable.propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(Row)).isRequired,
}

export function Expandable({ children: [first, second] }) {
    const [expanded, toggleExpanded] = useToggle(false)
    const lastIndex = Children.count(first.props.children) - 1
    const cells = Children.map(first.props.children, (child, index) => {
        if (index !== lastIndex) {
            return child
        }

        return cloneElement(child, TR_WITH_BUTTON_PROPS, [
            child.props.children,
            <Expand
                key="expand"
                expanded={expanded}
                onClick={toggleExpanded}
            />,
        ])
    })

    const children = cloneElement(first, null, cells)

    return expanded ? (
        <Fragment>
            {children}
            {cloneElement(second, { controlled: true })}
        </Fragment>
    ) : (
        children
    )
}

// Utils
const TR_WITH_BUTTON_PROPS = {
    style: {
        paddingRight: 36,
    },
}
