import React from 'react'
import Renderer from 'react-test-renderer'
import Alert, { DANGER, INFO, WARNING, SUCCESS } from './'

test('alert component', () => {
    [DANGER, INFO, WARNING, SUCCESS].forEach(type => {
        const alert = Renderer.create(<Alert type={type}>Content</Alert>)

        expect(alert).toMatchSnapshot()
    })
})
