import React from 'react'
import {Image} from 'components/misc'
import {Tab, TabSet} from 'components/tab'
import {Article} from 'components/page'
import Tutorial from './Tutorial'
import {Loop} from 'components/weather'

export default function Precipitation() {
    return (
        <Article title='Precipitation'>
            <TabSet>
                <Tab title='BC (HR)'>
                    <Loop type='Precipitation_1h_HR_BC' />
                </Tab>
                <Tab title='South Coast (HR)'>
                    <Loop type='Precipitation_1h_HR_scst' />
                </Tab>
                <Tab title='South Interior (HR)'>
                    <Loop type='Precipitation_1h_HR_sint' />
                </Tab>
                <Tab title='Type (R)'>
                    <Loop type='Precipitation_Type_3h_R_bc' />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='precipitation' />
                </Tab>
            </TabSet>
        </Article>
    )
}
