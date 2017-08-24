import React from 'react'
import Renderer from 'react-test-renderer'
import Avatar from './Avatar'

test('avatar component', () => {
    let avatar = Renderer.create(<Avatar name="Karl Guillotte" />)

    expect(avatar).toMatchSnapshot()

    avatar = Renderer.create(
        <Avatar
            name="Karl Guillotte"
            url="//avatars1.githubusercontent.com/u/744011?v=3&s=40"
        />
    )

    expect(avatar).toMatchSnapshot()
})
