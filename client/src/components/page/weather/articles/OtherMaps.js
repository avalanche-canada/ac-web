import React from 'react'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import Tutorial from './Tutorial'
import Loop from 'components/weather/Loop'

export default function SurfaceMaps() {
    return (
        <Article title='500mb & Precipitable water'>
            <TabSet>
                <Tab title='500mb'>
                    <Loop type='AC_GDPS_EPA_clds-th-500hts' interval={500} />
                </Tab>
                <Tab title='Precipitable water'>
                    <Loop type='AC_GDPS_EPA_tpw' interval={500} />
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='other-maps' />
                </Tab>
            </TabSet>
        </Article>
    )
}
