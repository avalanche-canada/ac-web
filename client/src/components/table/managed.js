import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import noop from 'lodash/noop'
import {
    Table as Base,
    Row,
    Header as THead,
    HeaderCell,
    TBody,
    Cell,
} from '~/components/table'

export const Column  = Immutable.Record({
    name: null,
    title: null,
    property: null,
    style: null,
    sorting: null,
}, 'Column')

Object.assign(Column, {
    create(definition) {
        return new Column(definition)
    }
})

export const Header = Immutable.Record({
    name: null,
    title: null,
    rowSpan: null,
    colSpan: null,
    style: null,
}, 'Header')

Object.assign(Header, {
    create(definition) {
        return new Header(definition)
    }
})

export const Body = Immutable.Record({
    title: null,
    featured: false,
    data: null,
})

Object.assign(Body, {
    create(definition) {
        return new Body(definition)
    }
})

function renderCell({property, name, style}) {
    return (
        <Cell key={name} style={style}>
            {typeof property === 'function' ? property(this) : this[property]}
        </Cell>
    )
}

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)).isRequired,
    headers: PropTypes.arrayOf(PropTypes.instanceOf(Header)),
    bodies: PropTypes.arrayOf(PropTypes.instanceOf(Body)),
    onSortingChange: PropTypes.func,
    children: PropTypes.node,
}

const LIST = new Immutable.List()

export default function Table({
    columns = LIST,
    bodies = LIST,
    headers = columns,
    children,
    onSortingChange = noop,
    ...props
}) {
    return (
        <Base {...props}>
            <THead>
                {/* TODO Could have more than a header row. Headers cold be an Iterable of headers */}
                <Row>
                    {headers.map(({title, name, property, style, sorting}, index) => (
                        <HeaderCell key={index}  style={style} sorting={sorting} onSortingChange={onSortingChange.bind(null, name)}>
                            {typeof title === 'function' ? title() : title}
                        </HeaderCell>
                    ))}
                </Row>
            </THead>
            {bodies.map(({data, title, featured}, bIndex) => (
                <TBody key={bIndex} title={title} featured={featured}>
                {data.map((row, rIndex) => (
                    <Row key={rIndex}>
                        {columns.map(renderCell, row)}
                    </Row>
                ))}
                </TBody>
            ))}
            {children}
        </Base>
    )
}
