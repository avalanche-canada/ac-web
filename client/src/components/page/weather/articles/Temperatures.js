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
                </Tab>
                <Tab title='Freezing level (R)'>
                    <Image src='http://avalanche.ca/assets/images/weather/freezing_level.png' />
                </Tab>
                <Tab title='1500m am (G)'>
                    <Loop type='AC_GDPS_BC_1500m-temp' hours={range(12, 144, 24)} />
                </Tab>
                <Tab title='1500m pm (G)'>
                    <Loop type='AC_GDPS_BC_1500m-temp' hours={range(0, 144, 24)} />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='temperatures' />
                </Tab>
            </TabSet>
        </Article>
    )
}
