import React from 'react'
import Renderer from 'react-test-renderer'
import Highlight, { DANGER, WARNING, INFO, SUCCESS } from './Highlight'

const TYPES = [DANGER, WARNING, INFO, SUCCESS]

test('highlight component', () => {
    TYPES.forEach(type => {
        const highlight = Renderer.create(
            <Highlight type={type}>Content</Highlight>
        )

        expect(highlight).toMatchSnapshot()
    })
})
