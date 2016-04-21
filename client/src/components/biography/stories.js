import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Biography, Staff } from './index'

const Karl = {
    name: 'Karl Guillotte',
    email: 'kguillotte@avalanche.ca',
    phone: '250-837-2141',
    ext: '112',
    title: 'Web developer',
    avatar: 'https://avatars1.githubusercontent.com/u/744011?v=3&s=60',
}

storiesOf('Biography', module)
.add('Biography', () => (
    <Biography {...Karl} >
        His biography.
    </Biography>
))
.add('Staff', () => (
    <Staff {...Karl} >
        His biography.
    </Staff>
))
