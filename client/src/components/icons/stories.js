import React, { createElement } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import * as Icons from './index'
import * as MinIcons from './min/index'

const stories = storiesOf('Icons', module)

Object.keys(Icons).forEach(name => {
    stories.add(name, () => (
        <div>
            {createElement(Icons[name])}
            <pre>{`import {${name}} from 'components/icons'`}</pre>
        </div>
    ))
})

Object.keys(MinIcons).forEach(name => {
    stories.add(name, () => (
        <div>
            {createElement(MinIcons[name])}
            <pre>{`import {${name}} from 'components/icons/min'`}</pre>
        </div>
    ))
})
