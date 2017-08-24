import React from 'react'
import Renderer from 'react-test-renderer'
import Blockquote from './Blockquote'

test('blockquote component', () => {
    const blockquote = Renderer.create(
        <Blockquote>Blockquote content</Blockquote>
    )

    expect(blockquote).toMatchSnapshot()
})
