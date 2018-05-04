import React from 'react'
import Renderer from 'react-test-renderer'
import Biography from './Biography'

const Karl = {
    firstName: 'Karl',
    lastName: 'Guillotte',
    email: 'kguillotte@avalanche.ca',
    workPhoneNumber: '250-837-2141',
    ext: '112',
    title: 'Web developer',
    avatar: 'https://avatars1.githubusercontent.com/u/744011?v=3&s=60',
}

test('biography component', () => {
    const biography = Renderer.create(
        <Biography {...Karl}>Karl's bio</Biography>
    )

    expect(biography).toMatchSnapshot()
})
