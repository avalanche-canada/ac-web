import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Responsive, PageSizeSelector } from 'components/table'
import {
    Table,
    TBody,
    Header,
    HeaderCell,
    Row,
    Cell,
    Caption,
} from 'components/table'
import Pagination from 'components/pagination'
import { Status } from 'components/misc'
import { Br } from 'components/markup'
import { parse } from 'prismic'
import get from 'lodash/get'
import snakeCase from 'lodash/snakeCase'
import { NONE, DESC } from 'constants/sortings'
import { StructuredText } from 'prismic/components/base'
import { DocumentsContainer } from 'prismic/containers'
import * as Predicates from 'vendor/prismic/predicates'

const YES = 'Yes'

export default class PrismicTable extends PureComponent {
    static propTypes = {
        value: PropTypes.array.isRequired,
    }
    state = {
        sorting: [null, NONE],
        pageSize: 25,
        page: 1,
    }
    constructor(props) {
        super(props)

        this.columns = props.value.map(createColumn)
    }
    createMessages({ totalResultsSize }) {
        return {
            isLoading: 'Loading documents...',
            isLoaded: `Total of ${totalResultsSize} documents found.`,
        }
    }
    handleSortingChange(name, order) {
        this.setState({
            sorting: [name, order],
            page: 1,
        })
    }
    handlePageSizeChange = pageSize => {
        this.setState({
            pageSize,
            page: 1,
        })
    }
    handlePageChange = page => {
        this.setState({ page })
    }
    getSorting(column) {
        if (column.sortable) {
            const [name, order] = this.state.sorting

            if (column.name === name) {
                return order
            }

            return NONE
        }
    }
    get type() {
        return get(this.props, ['value', 0, 'source'])
    }
    get params() {
        const { pageSize, page } = this.state
        const [name, order] = this.state.sorting
        const orderings = []

        if (name && order !== NONE) {
            orderings.push(
                `my.${this.type}.${snakeCase(name)} ${
                    order === DESC ? 'desc' : ''
                }`.trim()
            )
        }

        return {
            predicates: [Predicates.type(this.type)],
            options: {
                orderings,
                pageSize,
                page,
            },
        }
    }
    renderRow = row => {
        return (
            <Row key={row.id}>
                {this.columns.map(({ name, property }) => (
                    <Cell key={name}>{property(row.data)}</Cell>
                ))}
            </Row>
        )
    }
    renderContent({ documents, status, metadata }) {
        this.totalPages = metadata.totalPages || this.totalPages
        documents = documents.map(document => parse(document))

        return [
            <Br />,
            <Responsive>
                <Table bordered>
                    <Header>
                        {this.columns.map(column => (
                            <HeaderCell
                                key={column.name}
                                sorting={this.getSorting(column)}
                                onSortingChange={this.handleSortingChange.bind(
                                    this,
                                    column.name
                                )}>
                                {column.title}
                            </HeaderCell>
                        ))}
                    </Header>
                    <TBody>{documents.map(this.renderRow)}</TBody>
                    <Caption>
                        <Status
                            {...status}
                            messages={this.createMessages(metadata)}
                        />
                    </Caption>
                </Table>
            </Responsive>,
            <PageSizeSelector
                value={this.state.pageSize}
                onChange={this.handlePageSizeChange}
                suffix="documents par page"
            />,
            <Pagination
                active={this.state.page}
                onChange={this.handlePageChange}
                total={this.totalPages}
            />,
        ]
    }
    render() {
        return (
            <DocumentsContainer params={this.params}>
                {props => this.renderContent(props)}
            </DocumentsContainer>
        )
    }
}

// TODO: Look to use children as function
function createProperty(type, property, option1) {
    switch (type) {
        case 'Link':
            // TODO: Target could be provided as option, named option like "target"
            return function link(data) {
                return (
                    <a href={data[option1]} target="_blank">
                        {data[property]}
                    </a>
                )
            }
        case 'Html':
            return function html(data) {
                return <StructuredText value={data[property]} />
            }
        default:
            return data => data[property]
    }
}

function createColumn({ name, sortable, type, property, filterable, option1 }) {
    return {
        name: property,
        title: name,
        sortable: sortable === YES,
        filterable: filterable === YES,
        property: createProperty(type, property, option1),
    }
}
