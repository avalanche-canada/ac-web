import React from 'react'
import {Tab, TabSet} from 'components/tab'
import {Article} from 'components/page'
import TutorialTab from './TutorialTab'
import {Loop, Image} from 'components/weather'
import Bulletin from './Bulletin'

export default function Precipitation12h() {
    return (
        <Article title='Precipitation 12 hours Totals'>
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
                <TutorialTab uid='precipitation-12h' />
            </TabSet>
        </Article>
    )
}
