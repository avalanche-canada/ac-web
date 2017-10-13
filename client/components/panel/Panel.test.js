import React from 'react'
import Renderer from 'react-test-renderer'
import Panel, { SIMPLE, INVERSE } from './Panel'

const THEMES = [SIMPLE, INVERSE]
const header = 'Header'

test('panel component', () => {
    THEMES.forEach(theme => {
        const panel = Renderer.create(
            <Panel header={header} theme={theme}>Content</Panel>
        )

        expect(panel).toMatchSnapshot()
    })

    THEMES.forEach(theme => {
        const panel = Renderer.create(
            <Panel header={header} expanded theme={theme}>Content</Panel>
        )

        expect(panel).toMatchSnapshot()
    })

    THEMES.forEach(theme => {
        const panel = Renderer.create(
            <Panel header={header} expandable theme={theme}>Content</Panel>
        )

        expect(panel).toMatchSnapshot()
    })
})
