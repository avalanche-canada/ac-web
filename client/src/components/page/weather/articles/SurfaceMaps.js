import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import Tutorial from './Tutorial'
import Loop from 'components/weather/Loop'

export default function SurfaceMaps() {
    return (
        <Article title='Surface Maps'>
            <TabSet>
                <Tab title='0-48 hours (R)'>
                    <Loop type='AC_RDPS_W-CST_3hr-precip-clds-th-slp' date={new Date(2016, 4, 1)} />
                    {/* <Loop type='Surface_Maps_0-48_R_wcst' /> */}
                </Tab>
                <Tab title='0-144 hours (G)'>
                    <Loop type='AC_GDPS_EPA_pacific-systems' date={new Date(2016, 4, 1)} />
                    {/* <Loop type='Surface_Maps_0-48_G_epac' /> */}
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='surface-maps' />
                </Tab>
            </TabSet>
        </Article>
    )
}
