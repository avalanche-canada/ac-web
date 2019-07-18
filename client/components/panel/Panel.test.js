import React from 'react'
import Renderer from 'react-test-renderer'
import Panel from './'

const header = 'Header'

test('panel component', () => {
    let panel = Renderer.create(<Panel header={header}>Content</Panel>)

    expect(panel).toMatchSnapshot()

    panel = Renderer.create(
        <Panel header={header} expanded>
            Content
        </Panel>
    )

    expect(panel).toMatchSnapshot()
})
