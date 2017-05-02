import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import {
    withKnobs,
    number,
    select,
    boolean,
} from '@kadira/storybook-addon-knobs'
import { TabSet, Tab, COMPACT, LOOSE } from './index'
import {
    QUICK,
    AVALANCHE,
    SNOWPACK,
    WEATHER,
    INCIDENT,
} from '~/components/icons/min/colors'

const stories = storiesOf('Tab', module)

stories.addDecorator(withKnobs)

stories.addWithInfo('TabSet', () => {
    const arrow = boolean('Arrow', true)
    const stacked = boolean('Stacked', false)
    const theme = select('Theme', [COMPACT, LOOSE], COMPACT)
    const activeIndex = number('Active tab', 0)

    return (
        <TabSet
            arrow={arrow}
            stacked={stacked}
            activeIndex={activeIndex}
            onActivate={action('activated')}
            theme={theme}>
            <Tab arrow={arrow} title="Header #1">
                Tab content #1
            </Tab>
            <Tab arrow={arrow} title="Header #2">
                Tab content #2
            </Tab>
            <Tab arrow={arrow} title="Header #3">
                Tab content #3
            </Tab>
        </TabSet>
    )
})

stories.add('TabSet with colors', () => (
    <TabSet arrow>
        <Tab arrow title="Quick" color={QUICK}>
            Content for QUICK
        </Tab>
        <Tab arrow title="Avalanche" color={AVALANCHE}>
            Content for AVALANCHE
        </Tab>
        <Tab arrow title="Snowpack" color={SNOWPACK}>
            Content for SNOWPACK
        </Tab>
        <Tab arrow title="Weather" color={WEATHER}>
            Content for WEATHER
        </Tab>
        <Tab arrow title="Incident" color={INCIDENT}>
            Content for INCIDENT
        </Tab>
    </TabSet>
))
