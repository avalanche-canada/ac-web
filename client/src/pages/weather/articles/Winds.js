import React from 'react'
import { TabSet, Tab } from '../../../components/tab'
import Loop from '../../../weather/Loop'
import Image from '../../../weather/Image'

export default function Precipitation() {
    return (
        <TabSet>
            <Tab title='Surface'>
                <Image url='http://avalanche.ca/assets/images/weather/winds-surface.png' />
            </Tab>
            <Tab title='1500 metres ASL'>
                    <Image url='http://avalanche.ca/assets/images/weather/winds-1500m-asl.png' />
            </Tab>
            <Tab title='2500 metres ASL'>
                <Loop type='AC_GDPS_BC_2500m-wind' />
            </Tab>
        </TabSet>
    )
}
