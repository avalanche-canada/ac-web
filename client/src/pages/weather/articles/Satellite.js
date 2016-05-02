import React from 'react'
import { TabSet, Tab } from '../../../components/tab'
import Loop from '../../../weather/Loop'
import Image from '../../../weather/Image'

export default function Satellite() {
    return (
        <TabSet>
            <Tab title='Water Vapour/Jet'>
                <Image url='http://avalanche.ca/assets/images/weather/satellite_water_vapour.png' />
            </Tab>
            <Tab title='IR Pacific'>
                <Image url='http://avalanche.ca/assets/images/weather/new_satellite_ir_redtop.png' />
            </Tab>
            <Tab title='IR West Coast'>
                <Image url='http://avalanche.ca/assets/images/weather/ir-west-coast.png' />
            </Tab>
            <Tab title='Composite IR-VIS'>
                <Image url='http://avalanche.ca/assets/images/weather/new_satellite_ir_composite.png' />
            </Tab>
        </TabSet>
    )
}
