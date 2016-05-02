import React from 'react'
import { TabSet, Tab } from '../../../components/tab'
import Loop from '../../../weather/Loop'
import Image from '../../../weather/Image'
import range from 'lodash.range'

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
                <Loop type='AC_GDPS_BC_1500m-temp' hours={range(12, 144, 24)} />
            </Tab>
            <Tab title='1500 metres ASL PM'>
                <Loop type='AC_GDPS_BC_1500m-temp' hours={range(0, 144, 24)} />
            </Tab>
        </TabSet>
    )
}
