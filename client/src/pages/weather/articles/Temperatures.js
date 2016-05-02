import React from 'react'
import { TabSet, Tab } from '../../../components/tab'
import Loop from '../../../weather/Loop'
import Image from '../../../weather/Image'

export default function Temperatures() {
    return (
        <TabSet>
            <Tab title='Surface'>
                <Image url='http://avalanche.ca/assets/images/weather/temperature-surface.png' />
            </Tab>
            <Tab title='Freezing level'>
                <Image url='http://avalanche.ca/assets/images/weather/freezing_level.png' />
            </Tab>
            <Tab title='1500 metres ASL AM'>
                <p>Need to apply the logic...</p>
                <Loop type='AC_GDPS_BC_1500m-temp' />
            </Tab>
            <Tab title='1500 metres ASL PM'>
                <p>Need to apply the logic...</p>
                <Loop type='AC_GDPS_BC_1500m-temp' />
            </Tab>
        </TabSet>
    )
}
