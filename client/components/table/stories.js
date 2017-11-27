import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { List, Term, Definition } from 'components/description'
import Table from './Table'
import TBody, { ControlledTBody } from './TBody'
import Row from './Row'
import Cell from './Cell'
import Header from './Header'
import HeaderCell from './HeaderCell'
import { ASC, DESC, NONE } from 'constants/sortings'

const description = (
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
)
const onSortingChange = action('onSortingChange')
const header = (
    <Header>
        <Row>
            <HeaderCell>Dates</HeaderCell>
            <HeaderCell sorting={ASC} onSortingChange={onSortingChange}>
                Type
            </HeaderCell>
            <HeaderCell>Location</HeaderCell>
            <HeaderCell sorting={DESC} onSortingChange={onSortingChange}>
                User group
            </HeaderCell>
            <HeaderCell sorting={NONE} onSortingChange={onSortingChange}>
                Provider
            </HeaderCell>
        </Row>
    </Header>
)
function row(expanded) {
    return (
        <Row expanded={expanded}>
            <Cell>Jan 00, 0000 to <br />Jan 00, 0000</Cell>
            <Cell>
                <a href="#">AST 1</a>
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
            <Cell>{description}</Cell>
        </Row>
    )
}

export const table = (
    <Table>
        {header}
        <ControlledTBody featured title="Our sponsors">
            {row(true)}
            {controlled()}
            {row(true)}
            {controlled()}
        </ControlledTBody>
        <ControlledTBody title="The others">
            {row(true)}
            {controlled()}
            {row(false)}
            {controlled()}
            {row(true)}
            {controlled()}
            {row(false)}
            {controlled()}
            {row(true)}
            {controlled()}
            {row(false)}
            {controlled()}
            {row(true)}
            {controlled()}
            {row(true)}
            {controlled()}
        </ControlledTBody>
    </Table>
)

storiesOf('Table', module)
    .add('Uncontrolled', () => (
        <Table>
            {header}
            <TBody featured title="Our sponsors">
                {row()}
                {row()}
                {row(true)}
                {controlled()}
            </TBody>
            <TBody title="The others">
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
            </TBody>
        </Table>
    ))
    .add('Controlled', () => table)
