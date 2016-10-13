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
                    {/* <Loop type='Winds_Surface_3h_R_marine' /> */}
                </Tab>
                <Tab title='1500m (G)'>
                    <Image src='http://avalanche.ca/assets/images/weather/winds-1500m-asl.png' />
                    {/* <Loop type='Winds_1500m_3h_G_wcst' /> */}
                </Tab>
                <Tab title='2500m (G)'>
                    <Loop type='AC_GDPS_BC_2500m-wind' date={new Date(2016, 4, 1)} />
                    {/* <Loop type='Winds_2500m_3h_G_wcst' /> */}
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='winds' />
                </Tab>
            </TabSet>
        </Article>
    )
}
