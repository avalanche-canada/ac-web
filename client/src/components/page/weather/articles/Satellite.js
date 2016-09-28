import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import Tutorial from './Tutorial'

export default function Satellite({tutorial}) {
    return (
        <Article title='Satellite Imagery'>
            <TabSet>
                <Tab title='Water Vapour/Jet'>
                </Tab>
                <Tab title='IR Pacific'>
                </Tab>
                <Tab title='IR West Coast'>
                </Tab>
                <Tab title='IR-VIS BC'>
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='satellite' />
                </Tab>
            </TabSet>
        </Article>
    )
}
