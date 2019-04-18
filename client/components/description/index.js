import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Description.css'

export const Term = memo(BaseTerm)
export const Definition = memo(BaseDefinition)
export const List = memo(BaseList)

BaseTerm.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    block: PropTypes.bool,
}

function BaseTerm({ style, block, className, children }) {
    className = classNames(className, { Term: true, Block: block })

    return (
        <dt className={className} style={style}>
            {children}
        </dt>
    )
}

BaseDefinition.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    block: PropTypes.bool,
}

function BaseDefinition({ className, block, style, children }) {
    className = classNames(className, { Definition: true, Block: block })

    return (
        <dd className={className} style={style}>
            {children}
        </dd>
    )
}

Entry.propTypes = {
    term: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
}

export function Entry({ term, children }) {
    return (
        <Fragment>
            <BaseTerm>{term}</BaseTerm>
            <BaseDefinition>{children}</BaseDefinition>
        </Fragment>
    )
}

BaseList.propTypes = {
    children: PropTypes.node.isRequired,
    columns: PropTypes.oneOf([1, 2, 3]),
    theme: PropTypes.oneOf(['Simple', 'Inverse']),
    condensed: PropTypes.bool,
    bordered: PropTypes.bool,
    style: PropTypes.object,
}

function BaseList({
    columns = 1,
    theme = 'Simple',
    condensed = false,
    bordered = false,
    style,
    children,
}) {
    const className = classNames(`List--${theme}--${columns}Columns`, {
        Condensed: condensed,
        Bordered: bordered,
    })

    return (
        <dl style={style} className={className}>
            {children}
        </dl>
    )
}

// Styles
const classNames = classnames.bind(styles)
