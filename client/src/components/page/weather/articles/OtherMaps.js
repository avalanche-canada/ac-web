import React from 'react'
import {Article} from '/components/page'
import {Tab, TabSet} from '/components/tab'
import Tutorial from '/containers/WeatherTutorial'
import Loop from '/components/weather/Loop'

export default function SurfaceMaps() {
    return (
        <Article title='500mb & Precipitable Water'>
            <TabSet>
                <Tab title='500mb'>
                    <Loop type='AC_GDPS_EPA_clds-th-500hts' interval={500} withNotes />
                </Tab>
                <Tab title='Precipitable Water'>
                    <Loop type='AC_GDPS_EPA_tpw' interval={500} withNotes />
                </Tab>
                <Tab title='Tutorials'>
                    <Tutorial uid='other-maps' />
                </Tab>
            </TabSet>
        </Article>
    )
}
