import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { TabSet, Tab } from './index'

function tabSet(props = {}) {
    return (
        <TabSet {...props}>
            <Tab title='Header #1'>
                Tab content #1
            </Tab>
            <Tab title='Header #2'>
                Tab content #2
            </Tab>
            <Tab title='Header #3'>
                Tab content #3
            </Tab>
        </TabSet>
    )
}


storiesOf('Tab', module)
.add('TabSet', () => tabSet())
.add('TabSet w/ 2nd tab active', () => tabSet({ activeIndex: 1 }))
.add('TabSet controlled', () => tabSet({
    onActivate: action('tab'),
    activeIndex: 2
}))
