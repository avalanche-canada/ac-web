import React from 'react'
import Loop from '../../../weather/Loop'
import Image from '../../../weather/Image'
import ArticleHeader from '../../ArticleHeader'
import { TabSet, Tab } from '../../../components/tab'

export default function Temperatures() {
    return (
        <div>
            <ArticleHeader>Temperatures</ArticleHeader>
            <TabSet>
                <Tab title='Freezing level'>
                    <Image url={'http://avalanche.ca/assets/images/weather/freezing_level.png'} />
                </Tab>
                <Tab title='1500 metres'>
                    <Loop type='AC_GDPS_BC_1500m-temp' />
                </Tab>
            </TabSet>
        </div>
    )
}
