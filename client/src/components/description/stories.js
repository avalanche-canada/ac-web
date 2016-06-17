import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import List from './List'
import Term from './Term'
import Element from './Element'

function description(columns, horizontal) {
    return (
        <List columns={columns} horizontal={horizontal} >
            <Term>Telephone</Term>
            <Element>(000) 000-0000</Element>
            <Term>Email</Term>
            <Element>info@avalanche.ca</Element>
            <Term>Website</Term>
            <Element>avalanche.ca</Element>
            <Term>Location</Term>
            <Element>Revelstoke</Element>
            <Term>Contact</Term>
            <Element>Gilles Valade</Element>
        </List>
    )
}

storiesOf('Description', module)
.add('1 Column', () => description(1))
.add('2 Columns', () => description(2))
.add('horizontal 1 Column', () => description(1, true))
.add('horizontal 2 Columns', () => description(2, true))
