import React from 'react'
import { storiesOf, action } from '@storybook/react'
import Biography from './index'

const Karl = {
    firstName: 'Karl',
    lastName: 'Karl',
    email: 'kguillotte@avalanche.ca',
    workPhoneNumber: '250-837-2141',
    ext: '112',
    title: 'Web developer',
    avatar: 'https://avatars1.githubusercontent.com/u/744011?v=3&s=60',
}

const stories = storiesOf('Biography', module)

stories.addWithInfo('Biography', () => (
    <Biography {...Karl}>
        His biography.
    </Biography>
))
