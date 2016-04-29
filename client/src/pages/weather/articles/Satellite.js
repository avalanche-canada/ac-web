import React from 'react'
import Article from '../../Article'
import Loop from '../../../weather/Loop'
import Image from '../../../weather/Image'
import { TabSet, Tab } from '../../../components/tab'
import ArticleHeader from '../../ArticleHeader'
import infra1 from './images/new_satellite_ir_composite.png'
import infra2 from './images/new_satellite_ir_redtop.png'

export default function Satellite() {
    return (
        <Article>
            <ArticleHeader>Satellite imagery</ArticleHeader>
            <TabSet>
                <Tab title='Infrared'>
                    <Image url={infra1} />
                    <br />
                    <Image url={infra2} />
                </Tab>
                <Tab title='Visible wave length'>
                    Coming soon!
                </Tab>
            </TabSet>
        </Article>
    )
}
