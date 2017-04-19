import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import Panel, {SIMPLE, INVERSE} from './index'

storiesOf('Panel', module)
.add('Panel', () => (
    <Panel header='A panel'>
        <p>some content.</p>
        <p>some content.</p>
    </Panel>
))
.add('Expandable Panel', () => (
    <div>
        <Panel header='A panel' expandable>
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
        <Panel header='A panel with a looooooooooooooong title' expandable>
            <p>some content.</p>
            <p>some content.</p>
            <p>some content.</p>
        </Panel>
        <Panel header='A panel' expandable expanded>
            <p>some content.</p>
            <p>some content.</p>
            <p>some content.</p>
        </Panel>
    </div>
))
.add('Expandable Panel Inverse', () => (
    <div>
        <Panel header='A panel' expandable theme={INVERSE}>
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
        <Panel header='A panel with a looooooooooooooong title' expandable theme={INVERSE}>
            <p>some content.</p>
            <p>some content.</p>
            <p>some content.</p>
        </Panel>
        <Panel header='A panel' expandable expanded theme={INVERSE}>
            <p>some content.</p>
            <p>some content.</p>
            <p>some content.</p>
        </Panel>
    </div>
))
