import React from 'react'
import {compose, lifecycle, withHandlers, setDisplayName, withProps, onlyUpdateForKeys, withState, defaultProps} from 'recompose'
import Immutable from 'immutable'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router'
import {List, Term, Definition} from 'components/description'
import {asTermAndDefinition} from 'components/description/utils'
import {Table, Row, Cell, Header, ControlledTBody, TBody, HeaderCell, HeaderCellOrders, Caption, Responsive} from 'components/table'
import {Loading} from 'components/misc'
import {loadProviders, loadCourses} from 'actions/entities'
import * as providers from 'selectors/ast/providers'
import * as courses from 'selectors/ast/courses'
import {replace} from 'utils/router'
import {Markup} from 'components/markup'
import Pagination from 'components/pagination'
import {Article, Header as PageHeader} from 'components/page'

const {NONE, DESC} = HeaderCellOrders

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
            onSortingChange: props => (name, order = NONE) => {
                replace({
                    query: {
                        sorting: order === NONE ? undefined : `${order === DESC ? '-' : ''}${name}`
                    }
                }, props)
            },
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
