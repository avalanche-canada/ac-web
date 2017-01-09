import React from 'react'
import {Tab, TabSet} from 'components/tab'
import {Article} from 'components/page'
import Tutorial from '../Tutorial'
import {Loop} from 'components/weather'

export default function HourlyPrecipitation() {
    return (
        <Article title='Hourly Precipitation'>
            <TabSet>
                <Tab title='BC HR'>
                    <Loop type='AC_HRDPS_BC_wms-1hr-precip' interval={500} withNotes />
                </Tab>
                <Tab title='South Coast HR'>
                    <Loop type='AC_HRDPS_BC-S-Cst_1hr-precip' interval={500} withNotes />
                </Tab>
                <Tab title='South Interior HR'>
                    <Loop type='AC_HRDPS_BC-S-Int_1hr-precip' interval={500} withNotes />
                </Tab>
                <Tab title='Type R'>
                    <Loop type='AC_RDPS_BC_precip-types' interval={500} withNotes />
                </Tab>
                <Tab title='Tutorials'>
                    <Tutorial uid='hourly-precipitation' />
                </Tab>
            </TabSet>
        </Article>
    )
}
