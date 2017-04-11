import React from 'react'
import {Tab, TabSet} from 'components/tab'
import {Article} from 'components/page'
import Tutorial from '/containers/WeatherTutorial'
import {Loop} from 'components/weather'

export default function Temperatures() {
    return (
        <Article title='Temperatures'>
            <TabSet>
                <Tab title='Freezing Level R'>
                    <Loop type='AC_RDPS_BC_freezing-level' withNotes />
                </Tab>
                <Tab title='1500m 4am G'>
                    <Loop type='AC_GDPS_BC_850-temp-4am' withNotes />
                </Tab>
                <Tab title='1500m 4pm G'>
                    <Loop type='AC_GDPS_BC_850-temp-4pm' withNotes />
                </Tab>
                <Tab title='Surface HR'>
                    <Loop type='AC_HRDPS_BC_sfc-temp-3hr-freq' withNotes />
                </Tab>
                <Tab title='Tutorials'>
                    <Tutorial uid='temperatures' />
                </Tab>
            </TabSet>
        </Article>
    )
}
