import React from 'react'
import PropTypes from 'prop-types'
import {compose, lifecycle, withHandlers, setDisplayName, withProps, onlyUpdateForKeys, withState} from 'recompose'
import Immutable from 'immutable'
import {connect} from 'react-redux'
import withRouter from 'react-router/lib/withRouter'
import {List, Term, Definition} from '~/components/description'
import {asTermAndDefinition} from '~/components/description/utils'
import {Table, Row, Cell, Header, ControlledTBody, HeaderCell, Caption, Responsive} from '~/components/table'
import {loadProviders, loadCourses} from '~/actions/entities'
import * as providers from '~/selectors/ast/providers'
import * as courses from '~/selectors/ast/courses'
import {Markup} from '~/components/markup'
import Pagination from '~/components/pagination'
import {Article, Header as PageHeader} from '~/components/page'
import {sortingHandlerFactory} from '~/utils/router'

// TODO: Reuse controlled table component

function renderControlled(data, asControlled) {
    //TODO(wnh): make the special 'Description' less special
    //TODO(wnh): Remove the inline style!!!!!!!!
    let controlled = asControlled(data)
    let {Description} = controlled
    delete controlled.Description

    return (
        <Row key={`controlled-${data.id}`}>
            <Cell>
                <div style={{display:'flex'}}>
                    <div style={{flex:1}}>
                        <List columns={1} theme='Inline' horizontal>
                            <Term>Description</Term>
                            <Definition>
                                <Markup>
                                    {Description}
                                </Markup>
                            </Definition>
                        </List>
                    </div>
                    <div style={{flex:1}}>
                        <List columns={1} horizontal>
                            {asTermAndDefinition(controlled)}
                        </List>
                    </div>
                </div>
            </Cell>
        </Row>
    )
}

function renderRow(data, columns, expanded) {
    return (
        <Row key={data.id} expanded={expanded}>
            {columns.map(({property}, index) => (
            <Cell key={index}>
                {typeof property === 'function' ? property(data) : data[property]}
            </Cell>
            ))}
        </Row>
    )
}

function renderRows(data, columns, asControlled) {
    const expanded = typeof asControlled === 'function' ? false : undefined

    return data.reduce((data, row) => {
        data.push(renderRow(row, columns, expanded))

        if (typeof asControlled === 'function') {
            data.push(renderControlled(row, asControlled))
        }

        return data
    }, [])
}

AstTable.propTypes = {
    title: PropTypes.string.isRequired,
    featured: PropTypes.array,
    rows: PropTypes.array,
    columns: PropTypes.array,
    caption: PropTypes.node,
    asControlled: PropTypes.func,
    onSortingChange: PropTypes.func,
    pagination: PropTypes.shape({
        total: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
    }).isRequired,
    setPage: PropTypes.func.isRequired,
}

function AstTable({
    title,
    featured = Immutable.List(),
    rows,
    columns,
    caption,
    asControlled,
    onSortingChange,
    pagination: {
        total,
        page,
    },
    setPage,
}) {
    const pagination = <Pagination total={total} active={page} onChange={setPage} />

    return (
        <Article>
            <PageHeader title={title} />
            <Responsive>
                <Table>
                    <Header>
                        <Row>
                        {columns.map(({title, name, property, ...header}, index) => (
                            <HeaderCell key={index} onSortingChange={onSortingChange.bind(null, name)}  {...header} >
                                {typeof title === 'function' ? title() : title}
                            </HeaderCell>
                        ))}
                        </Row>
                    </Header>
                    {!featured.isEmpty() &&
                        <ControlledTBody featured title='Our sponsors'>
                            {renderRows(featured, columns, asControlled)}
                        </ControlledTBody>
                    }
                    <ControlledTBody>
                        {renderRows(rows, columns, asControlled)}
                    </ControlledTBody>
                    <Caption>{caption}</Caption>
                </Table>
            </Responsive>
            {pagination}
        </Article>
    )
}

function connectEntities(name, mapStateToProps, load) {
    return compose(
        setDisplayName(name),
        withRouter,
        onlyUpdateForKeys(['rows', 'params']),
        withState('page', 'setPage', 1),
        withProps({pageSize: 15}),
        connect(mapStateToProps, {load}),
        withHandlers({
            onSortingChange: sortingHandlerFactory(),
        }),
        lifecycle({
            componentDidMount() {
                this.props.load({
                    page_size: 1000
                })
            },
            componentWillReceiveProps({location: {key}, setPage}) {
                if (key !== this.props.location.key) {
                    setPage(1)
                }
            }
        }),
    )(AstTable)
}

export const Providers = connectEntities('Providers', providers.table, loadProviders)
export const Courses = connectEntities('Courses', courses.table, loadCourses)
