import React from 'react'
import { storiesOf, action } from '@storybook/react'
import Panel, { SIMPLE, INVERSE } from './index'

storiesOf('Panel', module)
    .add('Panel', () => (
        <Panel header="A panel">
            <p>some content.</p>
            <p>some content.</p>
        </Panel>
    ))
    .add('Collapsible Panel', () => (
        <div>
            <Panel header="A panel">
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
            </Panel>
            <Panel header="A panel with a looooooooooooooong title">
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
            </Panel>
            <Panel header="A panel" expanded>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
            </Panel>
        </div>
    ))
    .add('Collapsible Panel Inverse', () => (
        <div>
            <Panel header="A panel" theme={INVERSE}>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
            </Panel>
            <Panel
                header="A panel with a looooooooooooooong title"
                theme={INVERSE}>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
            </Panel>
            <Panel header="A panel" expanded theme={INVERSE}>
                <p>some content.</p>
                <p>some content.</p>
                <p>some content.</p>
            </Panel>
        </div>
    ))
