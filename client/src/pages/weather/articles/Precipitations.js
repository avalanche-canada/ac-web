import React from 'react'
import Loop from '../../../weather/Loop'
import Image from '../../../weather/Image'
import { TabSet, Tab } from '../../../components/tab'
import ArticleHeader from '../../ArticleHeader'

export default function Precipitations() {
    return (
        <div>
            <ArticleHeader>Precipitations</ArticleHeader>
            <TabSet>
                <Tab title='1 hour'>
                    <Loop type='AC_HRDPS_BC_wms-1hr-precip' />
                </Tab>
                <Tab title='3 hours'>
                    <Loop type='AC_RDPS_BC_3hr-precip' />
                </Tab>
                <Tab title='12 hours'>
                    <Loop type='AC_RDPS_BC_12hr-precip1' />
                    <Loop type='AC_HRDPS_S-CST_12hr-precip' />
                    <Loop type='AC_HRDPS_S-INT_12hr-precip' />
                </Tab>
            </TabSet>
        </div>
    )
}
