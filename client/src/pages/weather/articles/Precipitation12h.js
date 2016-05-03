import React from 'react'
import { TabSet, Tab } from '../../../components/tab'
import Loop from '../../../weather/Loop'
import Image from '../../../weather/Image'
import Bulletin from './Bulletin'

export default function Precipitation12h() {
    return (
        <TabSet>
            <Tab title='BC (R)'>
                <Loop type='AC_RDPS_BC_12hr-precip1' />
            </Tab>
            <Tab title='South Coast (HR)'>
                <Loop type='AC_HRDPS_S-CST_12hr-precip' />
            </Tab>
            <Tab title='Sourth Interior (HR)'>
                <Loop type='AC_HRDPS_S-INT_12hr-precip' />
            </Tab>
            <Tab title='Bulletins'>
                <Bulletin>
                    Here goes the bulletin!
                </Bulletin>
            </Tab>
        </TabSet>
    )
}
