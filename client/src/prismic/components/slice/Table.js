import React, {PropTypes} from 'react'
import {compose, lifecycle, withHandlers, withState} from 'recompose'
import {connect} from 'react-redux'
import {load} from 'actions/prismic'
import {createSelector} from 'reselect'
import {getDocumentsOfType, getResult} from 'getters/prismic'
import {Table, Row, Cell, Header, ControlledTBody, TBody, HeaderCell, HeaderCellOrders, Caption, Responsive, PageSizeSelector} from 'components/table'
import {FilterSet, FilterEntry} from 'components/filter'
import Pagination from 'components/pagination'
import {Loading, InnerHTML, Br} from 'components/misc'
import {DropdownFromOptions as Dropdown} from 'components/controls'
import transform from 'prismic/transformers'
import get from 'lodash/get'

const {NONE, DESC} = HeaderCellOrders
const YES = 'Yes'
const NO = 'No'

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

function createFilter({name, property}, {createFilterChangeHandler, filterings}, rows) {
    const options = rows.map(row => row[property]).filter(Boolean).toSet().sort().toArray()

    return {
        options: new Map(options.map(option => [option, option])),
        value: filterings.has(property) ? filterings.get(property) : new Set(),
        placeholder: name,
        onChange: createFilterChangeHandler(property),
    }
}

function createColumn({name, sortable, property, type, option1, option2, option3}, {createSortingChangeHandler, sorting}) {
    return {
        name,
        sorting: sortable !== YES ? undefined : (sorting[0] === property ? sorting[1] : NONE),
        onSortingChange: createSortingChangeHandler(property),
        property: createProperty(type, property, option1, option2, option3),
    }
}

function isFilterable(column) {
    return column.filterable === YES
}

const mapStateToProps = createSelector(
    (state, props) => getDocumentsOfType(state, getDocumentType(props)).toList()
                        .map(document => transform(document)),
    (state, props) => props.content,
    (state, props) => getResult(state, getDocumentType(props)),
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
            if (values.size > 0) {
                filters.push(row => values.has(row[property]))
            }
        })

        return filters
    },
    function computeRows(documents, columns, {isFetching}, props, sorting, filters) {
        const {page, pageSize} = props
        const begin = (page - 1) * pageSize
        const end = page * pageSize
        let rows = filters.reduce((rows, filter) => rows.filter(filter), documents)

        if (Array.isArray(sorting)) {
            const [sorter, order] = sorting

            rows = rows.sortBy(sorter)

            if (order === DESC) {
                rows = rows.reverse()
            }
        }

        return {
            isFetching,
            rows: rows.slice(begin, end),
            total: rows.size,
            columns: columns.map(column => createColumn(column, props)),
            filters: columns.filter(isFilterable).map(filter => createFilter(filter, props, documents)),
        }
    }
)

function Container({columns = [], rows = [], filters = [], total, pageSize, onPageSizeChange, page, setPage}) {
    // TODO: Use the Table generator!
    return (
        <div>
            <Br />
            <FilterSet>
            {filters.map(filter => (
                <FilterEntry>
                    <Dropdown {...filter} />
                </FilterEntry>
            ))}
            </FilterSet>
            <Responsive>
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
                </Table>
            </Responsive>
            <PageSizeSelector value={pageSize} onChange={onPageSizeChange} />
            <Pagination active={page} onChange={setPage} total={Math.ceil(total/pageSize)} />
        </div>
    )
}

export default compose(
    withState('sorting', 'setSorting', []),
    withState('filterings', 'setFilterings', new Map()),
    withState('pageSize', 'setPageSize', 25),
    withState('page', 'setPage', 1),
    withHandlers({
        createSortingChangeHandler: props => property => order => {
            props.setSorting([property, order])
        },
        createFilterChangeHandler: props => property => value => {
            const {filterings, setFilterings} = props

            filterings.set(property, value)

            setFilterings(new Map([...filterings]))
        },
        onPageSizeChange: props => page => {
            const {setPage, setPageSize} = props

            setPage(1)
            setPageSize(page)
        },
    }),
    connect(mapStateToProps, {
        load
    }),
    lifecycle({
        componentDidMount() {
            this.props.load({
                type: getDocumentType(this.props),
                options: {
                    pageSize: 150
                }
            })
        }
    }),
)(Container)
