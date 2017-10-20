import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { compose, withProps, withState, setDisplayName } from 'recompose'
import CSSModules from 'react-css-modules'
import { onlyUpdateForKey } from 'compose'
import styles from './Table.css'

BaseTBody.propTypes = {
    children: PropTypes.node.isRequired,
    featured: PropTypes.bool,
    title: PropTypes.string,
}

function BaseTBody({ featured = false, title, children }) {
    return (
        <tbody
            data-title={title}
            styleName={featured ? 'TBody--Featured' : 'TBody'}>
            {children}
        </tbody>
    )
}

const TBody = compose(onlyUpdateForKey('children'), CSSModules(styles))(
    BaseTBody
)

export default TBody

function isExpandable(row) {
    return typeof row.props.expanded === 'boolean'
}

function rowMapper(values, setValues, row, index, rows) {
    const previous = rows[index - 1]

    if (isExpandable(row)) {
        const expanded = values.has(index)
            ? values.get(index)
            : row.props.expanded
        const onExpandedToggle = () => {
            values.set(index, !expanded)
            setValues(new Map([...values]))
        }

        return cloneElement(row, { onExpandedToggle, expanded })
    }

    if (previous && isExpandable(previous)) {
        const prevIndex = index - 1
        const expanded = values.has(prevIndex)
            ? values.get(prevIndex)
            : previous.props.expanded
        const colSpan = Children.count(previous.props.children)
        const cell = Children.only(row.props.children)

        return cloneElement(
            row,
            {
                hide: !expanded,
                controlled: true,
            },
            cloneElement(cell, { colSpan })
        )
    }

    return row
}

export const Controlled = compose(
    setDisplayName('ControlledTBody'),
    onlyUpdateForKey('children'),
    withState('expandedValues', 'setExpandedValues', new Map()),
    withProps(({ children, expandedValues, setExpandedValues }) => {
        const rows = Children.toArray(children)
        const mapper = rowMapper.bind(null, expandedValues, setExpandedValues)

        return {
            children: rows.map(mapper),
        }
    })
)(TBody)
