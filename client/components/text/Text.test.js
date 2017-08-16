import React from 'react'
import Renderer from 'react-test-renderer'
import { Text, Muted, Loading, Error, Warning, Helper } from './Text'

test('text component', () => {
    const text = Renderer.create(<Text>Content</Text>)
    const muted = Renderer.create(<Muted>Content</Muted>)
    const loading = Renderer.create(<Loading>Content</Loading>)
    const error = Renderer.create(<Error>Content</Error>)
    const warning = Renderer.create(<Warning>Content</Warning>)
    const helper = Renderer.create(<Helper>Content</Helper>)

    expect(text).toMatchSnapshot()
    expect(muted).toMatchSnapshot()
    expect(loading).toMatchSnapshot()
    expect(error).toMatchSnapshot()
    expect(warning).toMatchSnapshot()
    expect(helper).toMatchSnapshot()
})
