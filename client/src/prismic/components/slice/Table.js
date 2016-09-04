import React, {PropTypes} from 'react'
import {compose, lifecycle, withHandlers, withState} from 'recompose'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {createSelector} from 'reselect'
import {getDocumentsOfType, getIsFetching} from 'reducers/prismic'
import {Staff} from 'prismic/types'
import {Table, Row, Cell, Header, ControlledTBody, TBody, HeaderCell, HeaderCellOrders, Caption} from 'components/table'
import {FilterSet, FilterEntry} from 'components/filter'
import {Loading, InnerHTML} from 'components/misc'
import {DropdownFromOptions as Dropdown} from 'components/controls'
import factory from 'prismic/types/factory'
import get from 'lodash/get'

const {isArray} = Array
const {NONE, ASC, DESC} = HeaderCellOrders
const YES = 'Yes'
const NO = 'No'

function parse(document) {
    // TODO: This is probably slow...require called many times
    return factory.getType(document)
}

function getDocumentType(props) {
    return get(props, 'content[0].source')
}

function createProperty(type, property, option1, option2, option3) {
    switch (type) {
        case 'Link':
            // TODO: Target could be provided as option, named option like "target"
            return data => (
                <a href={data[option1]} target='_blank'>
                    {data[property]}
                </a>
            )
        case 'Number':
            return data => data[property]
        case 'Currency':
            return data => data[property]
        case 'Date':
            return data => data[property]
        case 'Time':
            return data => data[property]
        case 'DateTime':
            return data => data[property]
        case 'Html':
            return data => (
                <InnerHTML>
                    {data[property]}
                </InnerHTML>
            )
        default:
            return property

    }
}

function createFilter({name, property}, {onFilterChange, filterings}, rows) {
    const options = rows.map(row => row[property]).filter(Boolean).toSet().sort().toArray()

    return {
        options: new Map(options.map(option => [option, option])),
        value: filterings.has(property) ? filterings.get(property) : new Set(),
        placeholder: name,
        onChange: onFilterChange(property),
    }
}

function createColumn({name, sortable, property, type, option1, option2, option3}, {onSortingChange, sorting}) {
    return {
        name,
        sorting: sortable !== YES ? undefined : (sorting[0] === property ? sorting[1] : NONE),
        onSortingChange: onSortingChange(property),
        property: createProperty(type, property, option1, option2, option3),
    }
}

function isFilterable(column) {
    return column.filterable === YES
}

const mapStateToProps = createSelector(
    (state, props) => getDocumentsOfType(state, getDocumentType(props)).toList().map(parse),
    (state, props) => props.content,
    getIsFetching,
    (state, props) => props,
    (state, props) => {
        const [property, order] = props.sorting

        if (!order || order === NONE) {
            return
        }

        return [row => row[property], order]
    },
    (state, props) => {
        const {filterings} = props
        const filters = []

        filterings.forEach((values, property) => {
            filters.push(row => values.has(row[property]))
        })

        return filters
    },
    function computeRows(documents, columns, isFetching, props, sorting, filters) {
        let rows = filters.reduce((rows, filter) => rows.filter(filter), documents)

        if (isArray(sorting)) {
            const [sorter, order] = sorting

            rows = rows.sortBy(sorter)

            if (order === DESC) {
                rows = rows.reverse()
            }
        }

        return {
            isFetching,
            rows,
            columns: columns.map(column => createColumn(column, props)),
            filters: columns.filter(isFilterable).map(filter => createFilter(filter, props, documents)),
        }
    }
)

function Container({columns = [], rows = [], filters = []}) {
    return (
        <div>
            <FilterSet>
            {filters.map(filter => (
                <FilterEntry>
                    <Dropdown {...filter} />
                </FilterEntry>
            ))}
            </FilterSet>
            <Table bordered>
                <Header>
                    <Row>
                    {columns.map(({name, property, ...header}) => (
                        <HeaderCell key={name} {...header}>
                            {name}
                        </HeaderCell>
                    ))}
                    </Row>
                </Header>
                <TBody>
                {rows.map(row => (
                    <Row key={row.id}>
                    {columns.map(({property, name}) => (
                        <Cell key={name}>
                            {typeof property === 'function' ? property(row) : row[property]}
                        </Cell>
                    ))}
                    </Row>
                ))}
                </TBody>
                <Caption>Showing {rows.size} entries</Caption>
            </Table>
        </div>
    )
}

export default compose(
    withState('sorting', 'setSorting', []),
    withState('filterings', 'setFilterings', new Map()),
    withHandlers({
        onSortingChange: props => property => order => {
            props.setSorting([property, order])
        },
        onFilterChange: props => property => value => {
            const {filterings, setFilterings} = props

            filterings.set(property, value)

            setFilterings(new Map([...filterings]))
        },
    }),
    connect(mapStateToProps, {
        loadForType
    }),
    lifecycle({
        componentDidMount() {
            const {props} = this
            const type = getDocumentType(props)

            props.loadForType(type, {
                pageSize: 150
            })
        }
    }),
)(Container)
