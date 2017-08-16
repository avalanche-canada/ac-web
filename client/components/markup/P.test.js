import React from 'react'
import Renderer from 'react-test-renderer'
import P from './P'

test('p component', () => {
    expect(Renderer.create(<P>Some content...</P>)).toMatchSnapshot()
    expect(
        Renderer.create(<P capAt={10}>Some content truncated...</P>)
    ).toMatchSnapshot()
})
