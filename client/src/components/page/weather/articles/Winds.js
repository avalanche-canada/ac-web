import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import Tutorial from './Tutorial'
import {Image} from 'components/misc'
import {Loop} from 'components/weather'

export default function Winds() {
    return (
        <Article title='Winds'>
            <TabSet>
                <Tab title='Surface (R)'>
                    <Image src='http://avalanche.ca/assets/images/weather/winds-surface.png' />
                </Tab>
                <Tab title='1500m (G)'>
                    <Image src='http://avalanche.ca/assets/images/weather/winds-1500m-asl.png' />
                </Tab>
                <Tab title='2500m (G)'>
                    <Loop type='AC_GDPS_BC_2500m-wind' />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='winds' />
                </Tab>
            </TabSet>
        </Article>
    )
}
