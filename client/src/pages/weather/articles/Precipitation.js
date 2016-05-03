import React from 'react'
import { TabSet, Tab } from '../../../components/tab'
import Loop from '../../../weather/Loop'
import Image from '../../../weather/Image'

export default function Precipitation() {
    return (
        <TabSet>
            <Tab title='Type (R)'>
                <Image url='http://avalanche.ca/assets/images/weather/precipitation-precip_type.png' />
            </Tab>
            <Tab title='1h (HR)'>
                <Loop type='AC_HRDPS_BC-LAM_1hr-precip' />
            </Tab>
            <Tab title='1h BC (HR)'>
                <Loop type='AC_HRDPS_BC_wms-1hr-precip' />
            </Tab>
        </TabSet>
    )
}
