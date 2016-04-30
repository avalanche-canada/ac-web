import React from 'react'
import Loop from '../../../weather/Loop'
import { TabSet, Tab } from '../../../components/tab'
import ArticleHeader from '../../ArticleHeader'

export default function MSLP() {
    return (
        <div>
            <ArticleHeader>
                Mean sea level pressure (MSLP)
            </ArticleHeader>
            <TabSet>
                <Tab title='Short range'>
                    <Loop type='AC_RDPS_W-CST_3hr-precip-clds-th-slp' />
                </Tab>
                <Tab title='Long range'>
                    <Loop type='AC_GDPS_EPA_pacific-systems' />
                </Tab>
            </TabSet>
        </div>
    )
}
