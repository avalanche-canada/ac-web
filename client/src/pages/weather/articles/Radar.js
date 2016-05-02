import React from 'react'
import { TabSet, Tab } from '../../../components/tab'
import Image from '../../../weather/Image'

export default function Radar() {
    return (
        <TabSet>
            <Tab title='BC Mosaic'>
                <Image url='http://avalanche.ca/assets/images/weather/new_radar_BC_mosaic.png' />
            </Tab>
            <Tab title='South Coast'>
                <Image url='http://avalanche.ca/assets/images/weather/new_radar_s_cst.png' />
            </Tab>
            <Tab title='Sourth Interior'>
                <Image url='http://avalanche.ca/assets/images/weather/new-radar_s_interior.png' />
            </Tab>
        </TabSet>
)
}
