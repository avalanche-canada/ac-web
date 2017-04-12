import React from 'react'
import {Article} from '/components/page'
import {Tab, TabSet} from '/components/tab'
import {Loop} from '/components/weather'
import Tutorial from '/containers/WeatherTutorial'

function Satellite({tutorial}) {
    return (
        <Article title='Satellite Imagery'>
            <TabSet>
                <Tab title='IR West Coast'>
                    <Loop type='AC_SAT_CAN-W-CST_ir-redtop' interval={200} amount={24} />
                </Tab>
                <Tab title='IR Pacific'>
                    <Loop type='AC_SAT_EPA_ir-redtop' interval={200} amount={24} />
                </Tab>
                <Tab title='Water Vapour/Jet'>
                    <Loop type='AC_SAT_EPA_water-vapour-jet' interval={200} amount={24} />
                </Tab>
                <Tab title='IR-VIS BC'>
                    <Loop type='AC_SAT_BC_ir-vis' interval={200} />
                </Tab>
                <Tab title='Tutorials'>
                    <Tutorial uid='satellite' />
                </Tab>
            </TabSet>
        </Article>
    )
}

export default Satellite
