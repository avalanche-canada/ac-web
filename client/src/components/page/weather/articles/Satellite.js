import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import {Loop} from 'components/weather'
import Tutorial from './Tutorial'

export default function Satellite({tutorial}) {
    return (
        <Article title='Satellite Imagery'>
            <TabSet>
                <Tab title='Water Vapour/Jet'>
                    <Loop type='AC_SAT_EPA_water-vapour-jet' />
                </Tab>
                <Tab title='IR Pacific'>
                    <Loop type='AC_SAT_EPA_ir-redtop' />
                </Tab>
                <Tab title='IR West Coast'>
                    <Loop type='AC_SAT_CAN-W-CST_ir-redtop' />
                </Tab>
                <Tab title='IR-VIS BC'>
                    <Loop type='AC_SAT_BC_ir-vis' />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='satellite' />
                </Tab>
            </TabSet>
        </Article>
    )
}
