import React, { Children, cloneElement, Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Table.css'

export default class TBody extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        featured: PropTypes.bool,
        title: PropTypes.string,
    }
    get className() {
        const className = this.props.featured ? 'TBody--Featured' : 'TBody'

        return styles[className]
    }
    shouldComponentUpdate({ children }) {
        return children !== this.props.children
    }
    render() {
        const { title, children } = this.props

        return (
            <tbody data-title={title} className={this.className}>
                {children}
            </tbody>
        )
    }
}

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

export class ControlledTBody extends Component {
    state = {
        expandedValues: new Map(),
    }
    setExpandedValues = expandedValues => this.setState({ expandedValues })
    shouldComponentUpdate({ children }, { expandedValues }) {
        return (
            children !== this.props.children ||
            expandedValues !== this.state.expandedValues
        )
    }
    get children() {
        const rows = Children.toArray(this.props.children)
        const mapper = rowMapper.bind(
            null,
            this.state.expandedValues,
            this.setExpandedValues
        )

        return rows.map(mapper)
    }
    render() {
        const { children, ...rest } = this.props

        return <TBody {...rest}>{this.children}</TBody>
    }
}
