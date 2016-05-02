import React from 'react'
import { TabSet, Tab } from '../../../components/tab'
import Loop from '../../../weather/Loop'

export default function MSLP() {
    return (
        <TabSet>
            <Tab title='0-48 hours RDPS'>
                <Loop type='AC_RDPS_W-CST_3hr-precip-clds-th-slp' />
            </Tab>
            <Tab title='0-144 hours GDPS'>
                <Loop type='AC_GDPS_EPA_pacific-systems' />
            </Tab>
        </TabSet>
    )
}
