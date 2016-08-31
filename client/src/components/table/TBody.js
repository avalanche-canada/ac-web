import React, { PropTypes, Children, cloneElement} from 'react'
import {compose, withProps, withState, setDisplayName} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

// TODO: Needs to have functions to expandAll and collapseAll

TBody.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    featured: PropTypes.bool,
    title: PropTypes.string,
}

function TBody({ featured = false, title, children }) {
    return (
        <tbody data-title={title} styleName={featured ? 'TBody--Featured' : 'TBody'}>
            {children}
        </tbody>
    )
}

export default TBody = CSSModules(TBody, styles)

function isExpandable(row) {
    return typeof row.props.expanded === 'boolean'
}

function rowMapper(values, setValues, row, index, rows) {
    const previous = rows[index - 1]

    if (isExpandable(row)) {
        const expanded = values.has(index) ? values.get(index) : row.props.expanded

        function onExpandedToggle() {
            values.set(index, !expanded)
            setValues(new Map([...values]))
        }

        return cloneElement(row, {onExpandedToggle, expanded})
    }

    if (previous && isExpandable(previous)) {
        const prevIndex = index - 1
        const expanded = values.has(prevIndex) ? values.get(prevIndex) : previous.props.expanded
        const colSpan = Children.count(previous.props.children)
        const cell = Children.only(row.props.children)
        const children = cloneElement(cell, {colSpan})
        const props = {
            hide: !expanded,
            controlled: true,
        }

        return cloneElement(row, props, children)
    }

    return row
}

export const Controlled = compose(
    setDisplayName('ControlledTBody'),
    withState('expandedValues', 'setExpandedValues', new Map()),
    withProps(({children, expandedValues, setExpandedValues}) => {
        const rows = Children.toArray(children)
        const mapper = rowMapper.bind(null, expandedValues, setExpandedValues)

        return {
            children: rows.map(mapper),
        }
    }),
)(TBody)
