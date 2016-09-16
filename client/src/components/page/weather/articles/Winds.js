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
                    <Loop type='Winds_Surface_3h_R_marine' />
                </Tab>
                <Tab title='1500m (G)'>
                    <Loop type='Winds_1500m_3h_G_wcst' />
                </Tab>
                <Tab title='2500m (G)'>
                    <Loop type='Winds_2500m_3h_G_wcst' />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='winds' />
                </Tab>
            </TabSet>
        </Article>
    )
}
