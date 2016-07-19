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
                    <Loop type='AC_RDPS_W-CST_3hr-precip-clds-th-slp' />
                </Tab>
                <Tab title='0-144 hours (G)'>
                    <Loop type='AC_GDPS_EPA_pacific-systems' />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='surface-maps' />
                </Tab>
            </TabSet>
        </Article>
    )
}
