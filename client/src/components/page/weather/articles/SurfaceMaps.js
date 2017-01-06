import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import Tutorial from '../Tutorial'
import Loop from 'components/weather/Loop'

export default function SurfaceMaps() {
    return (
        <Article title='Surface Maps'>
            <TabSet>
                <Tab title='0-48 Hours R'>
                    <Loop type='AC_RDPS_CAN-W_3hr-precip-clds-th-slp' interval={500} withNotes />
                </Tab>
                <Tab title='0-144 Hours G'>
                    <Loop type='AC_GDPS_EPA_6hr-precip-clds-th-slp' interval={500} withNotes />
                </Tab>
                <Tab title='Tutorials'>
                    <Tutorial uid='surface-maps' />
                </Tab>
            </TabSet>
        </Article>
    )
}
