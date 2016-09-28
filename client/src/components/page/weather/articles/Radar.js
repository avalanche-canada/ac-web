import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import Tutorial from './Tutorial'

export default function Radar() {
    return (
        <Article title='Radar Imagery'>
            <TabSet>
                <Tab title='BC Mosaic'>
                </Tab>
                <Tab title='South Coast'>
                </Tab>
                <Tab title='Sourth Interior'>
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='radar' />
                </Tab>
            </TabSet>
        </Article>
    )
}
