import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Weather from './weather'

const weather = {
    headline: 'Today is warm!',
    createdBy: 'KG v2.0',
    issuedAt: Date()
}

storiesOf('Pages', module)
.add('Weather', () => <Weather {...weather} />)
