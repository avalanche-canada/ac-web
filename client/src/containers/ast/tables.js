import React from 'react'
import {compose, lifecycle, setDisplayName} from 'recompose'
import {connect} from 'react-redux'
import {List, Term, Definition} from 'components/description'
import {asTermAndDefinition} from 'components/description/utils'
import {Table, Row, Cell, Header, ControlledTBody, TBody, HeaderCell, HeaderCellOrders} from 'components/table'
import {loadProviders, loadCourses} from 'actions/entities'
import * as selectors from 'selectors/ast'

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

function AstTable({featured, rows, columns, asControlled}) {
    return (
        <Table>
            <Header>
                <Row>
                {columns.map(({title, ...header}, index) => (
                    <HeaderCell key={index} {...header}>{title}</HeaderCell>
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
        </Table>
    )
}

function Connect(name, mapStateToProps, load) {
    return compose(
        setDisplayName(name),
        connect(mapStateToProps, {
            load
        }),
        lifecycle({
            componentDidMount() {
                this.props.load()
            },
        }),
    )(AstTable)
}

export const Providers = Connect('Providers', selectors.providers, loadProviders)
export const Courses = Connect('Courses', selectors.courses, loadCourses)
