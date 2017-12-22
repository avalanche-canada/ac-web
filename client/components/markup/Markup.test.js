import React from 'react'
import Renderer from 'react-test-renderer'
import { Br, Credit, Markup } from './'

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

test('Markup component', () => {
    expect(Renderer.create(<Markup>Some content...</Markup>)).toMatchSnapshot()
})
