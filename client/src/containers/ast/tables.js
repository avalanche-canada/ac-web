import React from 'react'
import {compose, lifecycle, withHandlers, setDisplayName} from 'recompose'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router'
import {List, Term, Definition} from 'components/description'
import {asTermAndDefinition} from 'components/description/utils'
import {Table, Row, Cell, Header, ControlledTBody, TBody, HeaderCell, HeaderCellOrders, Caption} from 'components/table'
import {Loading} from 'components/misc'
import {loadProviders, loadCourses} from 'actions/entities'
import * as providers from 'selectors/ast/providers'
import * as courses from 'selectors/ast/courses'

function renderControlled(data, asControlled) {
    return (
        <Row key={`controlled-${data.id}`}>
            <Cell>
                <List columns={2} horizontal>
                    {asTermAndDefinition(asControlled(data))}
                </List>
            </Cell>
        </Row>
    )
}

function renderRow(data, columns, expanded) {
    return (
        <Row key={`row-${data.id}`} expanded={expanded}>
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

function AstTable({featured, rows, columns, caption, asControlled, onSortingChange}) {
    return (
        <Table>
            <Header>
                <Row>
                {columns.map(({title, name, ...header}, index) => (
                    <HeaderCell key={index} onSortingChange={onSortingChange.bind(null, name)}  {...header} >
                        {typeof title === 'function' ? title() : title}
                    </HeaderCell>
                ))}
                </Row>
            </Header>
            {(featured && featured.length > 0) &&
                <ControlledTBody featured title='Our sponsors'>
                    {renderRows(featured, columns, asControlled)}
                </ControlledTBody>
            }
            <ControlledTBody>
                {renderRows(rows, columns, asControlled)}
            </ControlledTBody>
            <Caption>{caption}</Caption>
        </Table>
    )
}

function Connect(name, mapStateToProps, load) {
    return compose(
        setDisplayName(name),
        connect(mapStateToProps, {
            load
        }),
        withRouter,
        lifecycle({
            componentDidMount() {
                this.props.load()
            },
        }),
        withHandlers({
            onSortingChange: props => (name, order) => {
                const {router, location} = props

                router.replace({
                    ...location,
                    query: {
                        ...location.query,
                        sorting: [name, order],
                    }
                })
            },
        }),
    )(AstTable)
}

export const Providers = Connect('Providers', providers.table, loadProviders)
export const Courses = Connect('Courses', courses.table, loadCourses)
