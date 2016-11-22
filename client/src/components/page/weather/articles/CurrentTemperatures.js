import React from 'react'
import {Tab, TabSet} from 'components/tab'
import {Article} from 'components/page'
import Tutorial from './Tutorial'
import {Loop} from 'components/weather'

export default function CurrentTemperatures() {
    return (
        <Article title='Current temperatures'>
            <TabSet>
                <Tab title='Temperatures'>
                    <Loop type='AC_PLOT_BC_actual-temps' />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='current-temperatures' />
                </Tab>
            </TabSet>
        </Article>
    )
}
