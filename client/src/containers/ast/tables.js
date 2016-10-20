import React from 'react'
import {compose, lifecycle, withHandlers, setDisplayName, withProps, onlyUpdateForKeys, withState} from 'recompose'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router'
import {List, Term, Definition} from 'components/description'
import {asTermAndDefinition} from 'components/description/utils'
import {Table, Row, Cell, Header, ControlledTBody, TBody, HeaderCell, HeaderCellOrders, Caption, Responsive} from 'components/table'
import {Loading} from 'components/misc'
import {loadProviders, loadCourses} from 'actions/entities'
import * as providers from 'selectors/ast/providers'
import * as courses from 'selectors/ast/courses'
import {replaceQuery} from 'utils/router'
import {BasicMarkup} from 'components/markup'

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
                                <BasicMarkup text={Description} />
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
            {columns.map(({property, name}, index) => (
            <Cell key={index} data-name={name}>
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
    )
}

const {assign} = Object

function Connect(name, mapStateToProps, load) {
    return compose(
        setDisplayName(name),
        withRouter,
        onlyUpdateForKeys(['rows', 'params']),
        withState('params','setParams', props => {
            const {level, tags} = props.location.query
            // TODO: Add other pagination params here!!! But, will probably comes from the router!
            const params = {
                page_size: 15,
            }

            // We have to consider query params when we do the initial load.

            if (level) {
                assign(params, {
                    level
                })
            }

            if (tags) {
                assign(params, {
                    tags
                })
            }

            return params
        }),
        connect(mapStateToProps, {
            load
        }),
        withHandlers({
            onSortingChange: props => (name, order) => {
                replaceQuery({
                    sorting: [name, order],
                }, props)
            },
        }),
        lifecycle({
            componentDidMount() {
                const {params, setParams, load} = this.props

                load(params).then(() => {
                    setTimeout(() => {
                        // Load all entities (courses or providers)
                        const newParams = {
                            page_size: 1000,
                        }

                        load(newParams).then(() => {
                            setParams(newParams)
                        })
                    }, 100)
                })
            },
        }),
    )(AstTable)
}

export const Providers = Connect('Providers', providers.table, loadProviders)
export const Courses = Connect('Courses', courses.table, loadCourses)
