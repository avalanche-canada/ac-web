import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Description.css'

Term.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    block: PropTypes.bool,
}

export function Term({ style, block, className, children }) {
    className = classNames(className, { Term: true, Block: block })

    return (
        <dt className={className} style={style}>
            {children}
        </dt>
    )
}

Definition.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    block: PropTypes.bool,
}

export function Definition({ className, block, style, children }) {
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
            <Term>{term}</Term>
            <Definition>{children}</Definition>
        </Fragment>
    )
}

List.propTypes = {
    children: PropTypes.node.isRequired,
    inline: PropTypes.bool,
    condensed: PropTypes.bool,
    bordered: PropTypes.bool,
}

export function List({ inline, condensed, bordered, children }) {
    const className = classNames(styles.List, {
        Condensed: condensed,
        Bordered: bordered,
        Inline: inline,
    })

    return <dl className={className}>{children}</dl>
}

// Styles
const classNames = classnames.bind(styles)
