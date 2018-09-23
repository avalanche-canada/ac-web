import React from 'react'
import Renderer from 'react-test-renderer'
import { Router } from '@reach/router'
import Footer from './'

test('footer component', () => {
    const footer = Renderer.create(
        <Router>
            <Footer />
        </Router>
    )

    expect(footer).toMatchSnapshot()
})
