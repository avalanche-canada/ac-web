import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import Panel from './index'

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
