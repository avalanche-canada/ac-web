import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './Description.css'

Term.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    block: PropTypes.bool,
}

export function Term({ style, block, className, children }) {
    className = classnames(className, {
        [css.Term]: true,
        [css.Block]: block,
    })

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
    className = classnames(className, {
        [css.Definition]: true,
        [css.Block]: block,
    })

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
    const className = classnames(css.List, {
        [css.Condensed]: condensed,
        [css.Bordered]: bordered,
        [css.Inline]: inline,
    })

    return <dl className={className}>{children}</dl>
}
