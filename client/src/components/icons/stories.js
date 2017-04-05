import React, {createElement} from 'react'
import {storiesOf, action} from '@kadira/storybook'
import * as Icons from './index'

const stories = storiesOf('Icons', module)

Object.keys(Icons).forEach(name => {
    stories.add(name, () => (
        <div>
            {createElement(Icons[name])}
            <pre>{`import {${name}} from 'components/icons'`}</pre>
        </div>
    ))
})
