import React from 'react'
import Renderer from 'react-test-renderer'
import { Danger, Info, Warning, Success } from './'

test('alert component', () => {
    ;[Danger, Info, Warning, Success].forEach(Alert => {
        const alert = Renderer.create(<Alert>Content</Alert>)

        expect(alert).toMatchSnapshot()
    })
})
