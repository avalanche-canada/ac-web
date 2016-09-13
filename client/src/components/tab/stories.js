import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import {TabSet, Tab, COMPACT, LOOSE} from './index'
import {
    QUICK,
    AVALANCHE,
    SNOWPACK,
    WEATHER,
    INCIDENT,
} from 'components/icons/min/colors'

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
.add('Compact TabSet', () => tabSet({theme: COMPACT}))
.add('Loose TabSet', () => tabSet({theme: LOOSE}))
.add('TabSet with colors', () => (
    <TabSet arrow>
        <Tab arrow title='Quick' color={QUICK}>
            Content for QUICK
        </Tab>
        <Tab arrow title='Avalanche' color={AVALANCHE}>
            Content for AVALANCHE
        </Tab>
        <Tab arrow title='Snowpack' color={SNOWPACK}>
            Content for SNOWPACK
        </Tab>
        <Tab arrow title='Weather' color={WEATHER}>
            Content for WEATHER
        </Tab>
        <Tab arrow title='Incident' color={INCIDENT}>
            Content for INCIDENT
        </Tab>
    </TabSet>
))
