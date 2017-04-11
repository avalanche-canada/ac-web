import React from 'react'
import {Tab, TabSet} from '/components/tab'
import {Article} from '/components/page'
import Tutorial from '/containers/WeatherTutorial'
import {Loop} from '/components/weather'

export default function ActualTemperatures() {
    return (
        <Article title='Actual Temperatures (12 hours)'>
            <TabSet>
                <Tab title='Actual Temperatures'>
                    <Loop type='AC_PLOT_BC_actual-temps' amount={12} />
                </Tab>
                <Tab title='Tutorials'>
                    <Tutorial uid='actual-temperatures' />
                </Tab>
            </TabSet>
        </Article>
    )
}
