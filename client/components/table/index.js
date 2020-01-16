import React, { Children, cloneElement, Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useToggle } from 'hooks'
import { Expand } from 'components/button'
import { DropdownFromOptions as Dropdown } from 'components/controls'
import css from './Table.css'

export function ExpandableRow({ children: [first, second] }) {
    const [expanded, toggleExpanded] = useToggle(false)
    const lastIndex = Children.count(first.props.children) - 1
    const cells = Children.map(first.props.children, (child, index) => {
        if (index !== lastIndex) {
            return child
        }

        return (
            <FlexContentCell as="td">
                {child.props.children}
                <Expand
                    key="expand"
                    expanded={expanded}
                    onClick={toggleExpanded}
                />
            </FlexContentCell>
        )
    })

    return (
        <Fragment>
            {cloneElement(first, null, cells)}
            {cloneElement(second, {
                className: css.ControlledRow,
                hidden: !expanded,
            })}
        </Fragment>
    )
}

export function Responsive({ children, ...props }) {
    return (
        <div {...props} className={css.Responsive}>
            {children}
        </div>
    )
}

PageSizeSelector.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    numbers: PropTypes.arrayOf(PropTypes.number),
    max: PropTypes.number,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
}

export function PageSizeSelector({
    value,
    onChange,
    numbers,
    max,
    prefix = 'Show',
    suffix = 'entries per page.',
}) {
    if (!Array.isArray(numbers)) {
        if (typeof max === 'number') {
            numbers = NUMBERS.filter(number => number < max)
        } else {
            numbers = NUMBERS.slice(0, 3)
        }
    }

    return (
        <div className={css.PageSizeSelector}>
            <div>{prefix}</div>
            <div>
                <Dropdown
                    options={new Map(numbers.map(n => [n, n]))}
                    value={value || numbers[0]}
                    onChange={onChange}
                />
            </div>
            <div>{suffix}</div>
        </div>
    )
}

FlexContentCell.propTypes = {
    children: PropTypes.node.isRequired,
    as: PropTypes.string,
    className: PropTypes.string,
}

export function FlexContentCell({
    as: As = 'th',
    className,
    children,
    ...props
}) {
    return (
        <As className={classnames(css.FlexContentCell, className)} {...props}>
            <div>{children}</div>
        </As>
    )
}

// Constants
const NUMBERS = [10, 25, 50, 75, 100, 125, 150, 200]
