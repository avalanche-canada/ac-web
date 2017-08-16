import React from 'react'
import Renderer from 'react-test-renderer'
import Highlight, { DANGER, WARNING, INFO, SUCCESS } from './Highlight'

const STYLES = [DANGER, WARNING, INFO, SUCCESS]

test('highlight component', () => {
    STYLES.forEach(style => {
        const highlight = Renderer.create(
            <Highlight style={style}>Content</Highlight>
        )

        expect(highlight).toMatchSnapshot()
    })
})
