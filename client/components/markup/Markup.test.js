import React from 'react'
import Renderer from 'react-test-renderer'
import { Br, Credit, MultiLine } from './'

test('Br component', () => {
    expect(Renderer.create(<Br />)).toMatchSnapshot()
    expect(Renderer.create(<Br ribbon />)).toMatchSnapshot()
})

test('Credit component', () => {
    expect(Renderer.create(<Credit>Some credit</Credit>)).toMatchSnapshot()
    expect(
        Renderer.create(<Credit compact>Some credit</Credit>)
    ).toMatchSnapshot()
})

test('MultiLine component', () => {
    expect(
        Renderer.create(<MultiLine>Some content...</MultiLine>)
    ).toMatchSnapshot()
})
