import React from 'react'
import {Image} from 'components/misc'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import Tutorial from './Tutorial'
import {url} from 'assets'

export default function Satellite({tutorial}) {
    return (
        <Article title='Satellite Imagery'>
            <TabSet>
                <Tab title='Water Vapour/Jet'>
                    <Image src={url('images/weather/satellite_water_vapour.png')} />
                </Tab>
                <Tab title='IR Pacific'>
                    <Image src={url('images/weather/new_satellite_ir_redtop.png')} />
                </Tab>
                <Tab title='IR West Coast'>
                    <Image src={url('images/weather/ir-west-coast.png')} />
                </Tab>
                <Tab title='IR-VIS BC'>
                    <Image src={url('images/weather/ir-west-coast.png')} />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='satellite' />
                </Tab>
            </TabSet>
        </Article>
    )
}
