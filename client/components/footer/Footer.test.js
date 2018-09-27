import React from 'react'
import Renderer from 'react-test-renderer'
import Footer from './'

test('footer component', () => {
    const footer = Renderer.create(<Footer />)

    expect(footer).toMatchSnapshot()
})
