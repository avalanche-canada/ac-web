import React from 'react'
import Renderer from 'react-test-renderer'
import Phone from './Phone'

test('phone component', () => {
    let phone = Renderer.create(<Phone phone="250-837-2141" />)

    expect(phone).toMatchSnapshot()

    phone = Renderer.create(<Phone phone="250-837-2141" ext="112" />)

    expect(phone).toMatchSnapshot()

    phone = Renderer.create(
        <Phone phone="250-837-2141" ext="112">
            Call Karl Guillotte
        </Phone>
    )

    expect(phone).toMatchSnapshot()
})
