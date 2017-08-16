import React from 'react'
import Renderer from 'react-test-renderer'
import Br from './Br'
import P from './P'
import Credit from './Credit'

test('Br component', () => {
    expect(Renderer.create(<Br />)).toMatchSnapshot()
    expect(Renderer.create(<Br ribbon />)).toMatchSnapshot()
})

test('P component', () => {
    expect(Renderer.create(<P>Some content...</P>)).toMatchSnapshot()
    expect(
        Renderer.create(<P capAt={10}>Some content truncated...</P>)
    ).toMatchSnapshot()
})

test('Credit component', () => {
    expect(Renderer.create(<Credit>Some credit</Credit>)).toMatchSnapshot()
    expect(
        Renderer.create(<Credit compact>Some credit</Credit>)
    ).toMatchSnapshot()
})
