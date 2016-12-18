import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import {Loop} from 'components/weather'
import Tutorial from '../Tutorial'

export default function Radar() {
    return (
        <Article title='Radar Imagery'>
            <TabSet>
                <Tab title='BC Mosaic'>
                    <Loop type='AC_RADAR_BC_precip-rate' interval={200} amount={18} />
                </Tab>
                <Tab title='South Coast'>
                    <Loop type='AC_RADAR_BC-S-CST_precip-rate' interval={200} amount={18} />
                </Tab>
                <Tab title='Sourth Interior'>
                    <Loop type='AC_RADAR_BC-S-INT_precip-rate' interval={200} amount={18} />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='radar' />
                </Tab>
            </TabSet>
        </Article>
    )
}
