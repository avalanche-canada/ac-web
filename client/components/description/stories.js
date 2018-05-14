import React from 'react'
import { storiesOf, action } from '@storybook/react'
import List from './List'
import Term from './Term'
import Definition from './Definition'

function description(columns, theme) {
    return (
        <List {...{ columns, theme }}>
            <Term>Telephone</Term>
            <Definition>(000) 000-0000</Definition>
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
}

storiesOf('Description', module)
    .add('1 Column', () => description(1))
    .add('2 Columns', () => description(2))
    .add('Inverse 1 Column', () => description(1, 'Inverse'))
    .add('Inverse 2 Columns', () => description(2, 'Inverse'))
