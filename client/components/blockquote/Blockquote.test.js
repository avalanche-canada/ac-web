import React from 'react'
import Renderer from 'react-test-renderer'
import { Blockquote } from './'

test('blockquote component', () => {
    const blockquote = Renderer.create(
        <Blockquote>Blockquote content</Blockquote>
    )

    expect(blockquote).toMatchSnapshot()
})
