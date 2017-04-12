import React from 'react'
import {Tab, TabSet} from '/components/tab'
import {Article} from '/components/page'
import Tutorial from '/containers/WeatherTutorial'
import {Loop} from '/components/weather'

function Precipitation12h() {
    return (
        <Article title='12hr Total Precipitation'>
            <TabSet>
                <Tab title='BC R'>
                    <Loop type='AC_RDPS_BC_12hr-precip' withNotes />
                </Tab>
                <Tab title='South Coast HR'>
                    <Loop type='AC_HRDPS_BC-S-Cst_12hr-precip' withNotes />
                </Tab>
                <Tab title='Sourth Interior HR'>
                    <Loop type='AC_HRDPS_BC-S-Int_12hr-precip' withNotes />
                </Tab>
                <Tab title='Tutorials'>
                    <Tutorial uid='12h-precipitation' />
                </Tab>
            </TabSet>
        </Article>
    )
}

export default Precipitation12h
