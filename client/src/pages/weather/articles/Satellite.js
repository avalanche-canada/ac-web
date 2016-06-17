import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import TutorialTab from './TutorialTab'
import {InteractiveImage} from 'components/misc'
import Loop from 'components/weather/Loop'
import Image from 'components/weather/Image'

export default function Satellite() {
    return (
        <Article title='Satellite Imagery'>
            <TabSet>
                <Tab title='Water Vapour/Jet'>
                    <Image src='http://avalanche.ca/assets/images/weather/satellite_water_vapour.png' />
                </Tab>
                <Tab title='IR Pacific'>
                    <Image src='http://avalanche.ca/assets/images/weather/new_satellite_ir_redtop.png' />
                </Tab>
                <Tab title='IR West Coast'>
                    <Image src='http://avalanche.ca/assets/images/weather/ir-west-coast.png' />
                </Tab>
                <Tab title='IR-VIS BC'>
                    <InteractiveImage src='http://avalanche.ca/assets/images/weather/new_satellite_ir_composite.png' height={428} width={503} />
                </Tab>
                <TutorialTab uid='satellite' />
            </TabSet>
        </Article>
    )
}
