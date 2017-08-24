import React from 'react'
import Renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import Footer from './'

test('footer component', () => {
    const footer = Renderer.create(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    )

    expect(footer).toMatchSnapshot()
})
