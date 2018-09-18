import React from 'react'
import Renderer from 'react-test-renderer'
import { Muted, Loading, Error, Helper } from './Text'

test('text component', () => {
    const muted = Renderer.create(<Muted>Content</Muted>)
    const loading = Renderer.create(<Loading>Content</Loading>)
    const error = Renderer.create(<Error>Content</Error>)
    const helper = Renderer.create(<Helper>Content</Helper>)

    expect(muted).toMatchSnapshot()
    expect(loading).toMatchSnapshot()
    expect(error).toMatchSnapshot()
    expect(helper).toMatchSnapshot()
})
