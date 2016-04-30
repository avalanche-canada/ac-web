import React from 'react'
import Loop from '../../../weather/Loop'
import Image from '../../../weather/Image'
import ArticleHeader from '../../ArticleHeader'
import { TabSet, Tab } from '../../../components/tab'
import freezingLevel from './images/freezing_level.png'

export default function Temperatures() {
    return (
        <div>
            <ArticleHeader>Temperatures</ArticleHeader>
            <TabSet>
                <Tab title='Freezing level'>
                    <Image url={freezingLevel} />
                </Tab>
                <Tab title='1500 metres'>
                    <Loop type='AC_GDPS_BC_1500m-temp' />
                </Tab>
            </TabSet>
        </div>
    )
}
