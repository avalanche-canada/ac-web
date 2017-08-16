import React from 'react'
import Renderer from 'react-test-renderer'
import Br from './Br'

test('br component', () => {
    expect(Renderer.create(<Br />)).toMatchSnapshot()
    expect(Renderer.create(<Br ribbon />)).toMatchSnapshot()
})
