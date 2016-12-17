import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import Tutorial from './Tutorial'
import {Loop} from 'components/weather'

export default function Winds() {
    return (
        <Article title='Winds'>
            <TabSet>
                <Tab title='Surface R'>
                    <Loop type='AC_RDPS_BC_marine-winds' />
                </Tab>
                <Tab title='1500m G'>
                    <Loop type='AC_GDPS_BC_850-winds' interval={500} />
                </Tab>
                <Tab title='2500m G'>
                    <Loop type='AC_GDPS_BC_750-winds' interval={500} />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='winds' />
                </Tab>
            </TabSet>
        </Article>
    )
}
