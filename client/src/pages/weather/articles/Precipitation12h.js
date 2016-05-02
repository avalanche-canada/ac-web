import React from 'react'
import { TabSet, Tab } from '../../../components/tab'
import Loop from '../../../weather/Loop'
import Image from '../../../weather/Image'

export default function Precipitation12h() {
    return (
        <TabSet>
            <Tab title='RDPS'>
                <Loop type='AC_RDPS_BC_12hr-precip1' />
            </Tab>
            <Tab title='HRDPS South Coast'>
                <Loop type='AC_HRDPS_S-CST_12hr-precip' />
            </Tab>
            <Tab title='HRDPS Sourth Interior'>
                <Loop type='AC_HRDPS_S-INT_12hr-precip' />
            </Tab>
        </TabSet>
    )
}
