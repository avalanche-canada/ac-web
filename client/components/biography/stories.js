import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Biography from './index'

const Karl = {
    fullName: 'Karl Guillotte',
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
