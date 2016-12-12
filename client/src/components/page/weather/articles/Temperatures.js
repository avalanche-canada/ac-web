import React from 'react'
import {Tab, TabSet} from 'components/tab'
import {Article} from 'components/page'
import Tutorial from './Tutorial'
import {Loop} from 'components/weather'

export default function Temperatures() {
    return (
        <Article title='Temperatures'>
            <TabSet>
                <Tab title='Freezing level R'>
                    <Loop type='AC_RDPS_BC_freezing-level' />
                </Tab>
                <Tab title='1500m 4am G'>
                    <Loop type='AC_GDPS_BC_850-temp-4am' />
                </Tab>
                <Tab title='1500m 4pm G'>
                    <Loop type='AC_GDPS_BC_850-temp-4pm' />
                </Tab>
                <Tab title='Surface HR'>
                    <Loop type='AC_HRDPS_BC_sfc-temp-3hr-freq' />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='temperatures' />
                </Tab>
            </TabSet>
        </Article>
    )
}
