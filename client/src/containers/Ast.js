import React from 'react'
import Ast from 'components/page/ast'
import {List, Term, Definition} from 'components/description'
import {Table, Row, Cell, Header, ControlledTBody, HeaderCell, HeaderCellOrders} from 'components/table'

const {ASC, DESC, NONE} = HeaderCellOrders

function row(expanded) {
    return (
        <Row expanded={expanded}>
            <Cell>Jan 00, 0000 to <br />Jan 00, 0000</Cell>
            <Cell>
                <a href='#'>AST 1</a>
            </Cell>
            <Cell>Rogers Pass and Revelstoke, BC</Cell>
            <Cell>Ski</Cell>
            <Cell>Trigger Point Avalanche Training</Cell>
        </Row>
    )
}
function controlled() {
    return (
        <Row>
            <Cell>
                <List columns={2} horizontal>
                    <Term>Telephone</Term>
                    <Definition>(250) 123-4567</Definition>
                    <Term>Email</Term>
                    <Definition>info@avalanche.ca</Definition>
                    <Term>Website</Term>
                    <Definition>avalanche.ca</Definition>
                    <Term>Location</Term>
                    <Definition>Revelstoke</Definition>
                    <Term>Contact</Term>
                    <Definition>Gilles Valade</Definition>
                </List>
            </Cell>
        </Row>
    )
}

export default function Container() {
    return (
        <Ast>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>Dates</HeaderCell>
                        <HeaderCell sorting={ASC} onSortingChange={::console.log}>Type</HeaderCell>
                        <HeaderCell>Location</HeaderCell>
                        <HeaderCell sorting={DESC} onSortingChange={::console.log}>User group</HeaderCell>
                        <HeaderCell sorting={NONE} onSortingChange={::console.log}>Provider</HeaderCell>
                    </Row>
                </Header>
                <ControlledTBody featured title='Our sponsors'>
                    {row()}
                    {row()}
                    {row(true)}
                    {controlled()}
                </ControlledTBody>
                <ControlledTBody>
                    {row(true)}
                    {controlled()}
                    {row(false)}
                    {controlled()}
                    {row(true)}
                    {controlled()}
                    {row(true)}
                    {controlled()}
                    {row()}
                    {row()}
                    {row()}
                </ControlledTBody>
            </Table>
        </Ast>
    )
}
