import React, { PropTypes, Children, cloneElement} from 'react'
import {compose, withState, mapProps} from 'recompose'
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

function getExpandedValues({children}) {
    // Can not use Children.map: it does not iterate over "undefined"
    const rows = Children.toArray(children)

    return rows.map(row => row.props.expanded)
}

function isExpandableFactory(values) {
    return index => values[index] !== undefined
}

function propsMapper({children, expandedValues, setExpandedValues, ...rest}) {
    const isExpandable = isExpandableFactory(expandedValues)
    const rows = Children.toArray(children)
    function rowMapper(row, index) {
        if (isExpandable(index)) {
            const expanded = expandedValues[index]
            function onExpandedToggle() {
                expandedValues[index] = !expanded
                setExpandedValues(expandedValues)
            }

            return cloneElement(row, {onExpandedToggle, expanded})
        }

        if (isExpandable(index - 1)) {
            const controlled = true
            const previous = rows[index - 1]
            const hide = !expandedValues[index - 1]
            const span = Children.count(previous.props.children)
            const cell = Children.only(row.props.children)

            return cloneElement(row, {hide, controlled}, cloneElement(cell, {span}))
        }

        return row
    }

    return {
        children: rows.map(rowMapper),
        ...rest
    }
}

export const Controlled = compose(
    withState('expandedValues', 'setExpandedValues', getExpandedValues),
    mapProps(propsMapper),
)(TBody)
