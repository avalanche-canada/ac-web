import React from 'react'
import {Image} from 'components/misc'
import {Tab, TabSet} from 'components/tab'
import {Article} from 'components/page'
import Tutorial from './Tutorial'
import {Loop} from 'components/weather'
import range from 'lodash/range'

export default function Temperatures() {
    return (
        <Article title='Temperatures'>
            <TabSet>
                <Tab title='Surface (HR)'>
                    <Image src='http://avalanche.ca/assets/images/weather/temperature-surface.png' />
                    {/* <Loop type='Temperatures_Surface_1h_HR_lam' hours={range(12, 144, 24)} /> */}
                </Tab>
                <Tab title='Freezing level (R)'>
                    <Image src='http://avalanche.ca/assets/images/weather/freezing_level.png' />
                    {/* <Loop type='Freezing_Level_3h_R_wcst' hours={range(12, 144, 24)} /> */}
                </Tab>
                <Tab title='1500m am (G)'>
                    <Loop type='AC_GDPS_BC_1500m-temp' date={new Date(2016, 4, 1)} hours={range(12, 144, 24)} />
                    {/* <Loop type='Temperatures_1500m_6h_G_wcst' hours={range(12, 144, 24)} /> */}
                </Tab>
                <Tab title='1500m pm (G)'>
                    <Loop type='AC_GDPS_BC_1500m-temp' date={new Date(2016, 4, 1)} hours={range(0, 144, 24)} />
                    {/* <Loop type='Temperatures_1500m_6h_G_wcst' hours={range(0, 144, 24)} /> */}
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='temperatures' />
                </Tab>
            </TabSet>
        </Article>
    )
}
