import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import TutorialTab from './TutorialTab'
import Loop from 'components/weather/Loop'

export default function SurfaceMaps() {
    return (
        <Article title='Mean Sea Level Pressure (MSLP)'>
            <TabSet>
                <Tab title='0-48 hours (R)'>
                    <Loop type='AC_RDPS_W-CST_3hr-precip-clds-th-slp' />
                </Tab>
                <Tab title='0-144 hours (G)'>
                    <Loop type='AC_GDPS_EPA_pacific-systems' />
                </Tab>
                <TutorialTab uid='surface-maps' />
            </TabSet>
        </Article>
    )
}
