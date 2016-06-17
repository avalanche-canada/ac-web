import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import TutorialTab from './TutorialTab'
import Image from 'components/weather/Image'

export default function Radar() {
    return (
        <Article title='Radar Imagery'>
            <TabSet>
                <Tab title='BC Mosaic'>
                    <Image src='http://avalanche.ca/assets/images/weather/new_radar_BC_mosaic.png' />
                </Tab>
                <Tab title='South Coast'>
                    <Image src='http://avalanche.ca/assets/images/weather/new_radar_s_cst.png' />
                </Tab>
                <Tab title='Sourth Interior'>
                    <Image src='http://avalanche.ca/assets/images/weather/new-radar_s_interior.png' />
                </Tab>
                <TutorialTab uid='radar' />
            </TabSet>
        </Article>
    )
}
