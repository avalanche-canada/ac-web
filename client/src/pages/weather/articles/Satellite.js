import React from 'react'
import Article from '../../Article'
import Loop from '../../../weather/Loop'
import Image from '../../../weather/Image'
import { TabSet, Tab } from '../../../components/tab'
import ArticleHeader from '../../ArticleHeader'

export default function Satellite() {
    return (
        <Article>
            <ArticleHeader>Satellite imagery</ArticleHeader>
            <TabSet>
                <Tab title='Infrared'>
                    <Image url={'http://avalanche.ca/assets/images/weather/new_satellite_ir_composite.png'} />
                    <br />
                    <Image url={'http://avalanche.ca/assets/images/weather/new_satellite_ir_redtop.png'} />
                </Tab>
                <Tab title='Visible wave length'>
                    Coming soon!
                </Tab>
            </TabSet>
        </Article>
    )
}
