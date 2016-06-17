import React from 'react'
import {Article} from 'components/page'
import {resolve} from 'react-resolver'
import {Api, Html} from 'prismic'
import {TabSet, Tab} from 'components/tab'
import Image from 'components/weather/Image'
import {Launch} from 'components/icons'

function handleClick(event) {
    event.stopPropagation()
}
function fetchWarnings() {
    return Api.QueryDocument('VyOU5yYAAPU6X40L')
}
const WarningsContent = resolve('document', fetchWarnings)(Html)
const link = (
    <a href='http://weather.gc.ca/warnings/index_e.html?prov=bc' target='_blank'>
        Warnings Text <Launch height={14} width={14} />
    </a>
)

export default function Warnings() {
    return (
        <Article title='Warnings'>
            <TabSet>
                <Tab title='MSC Warnings'>
                    <Image src='http://avalanche.ca/assets/images/weather/warnings.png' />
                </Tab>
                <Tab title={link} onClick={handleClick} />
                <Tab title='Temperatures/MSLP'>
                    <Image src='http://avalanche.ca/assets/images/weather/RealTimeWeather-Temperatures.png' />
                    <WarningsContent />
                </Tab>
            </TabSet>
        </Article>
    )
}
