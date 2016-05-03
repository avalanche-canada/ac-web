import React from 'react'
import { resolve } from 'react-resolver'
import { QueryDocument, Html } from '../../../prismic'
import { TabSet, Tab } from '../../../components/tab'
import Image from '../../../weather/Image'
import { Launch } from '../../../components/icons'

function handleClick(event) {
    event.stopImmediatePropagation()
}
function fetchWarnings() {
    return QueryDocument('VyOU5yYAAPU6X40L')
}
const Warnings = resolve('document', fetchWarnings)(Html)
const link = (
    <a href='http://weather.gc.ca/warnings/index_e.html?prov=bc' target='_blank'>
        Warnings Text <Launch height={14} width={14} />
    </a>
)
export default function RealTime() {
    return (
        <TabSet>
            <Tab title='MSC Warnings'>
                <Image url='http://avalanche.ca/assets/images/weather/warnings.png' />
            </Tab>
            <Tab title={link} onClick={handleClick} />
        <Tab title='Temperatures/MSLP'>
                <Image url='http://avalanche.ca/assets/images/weather/RealTimeWeather-Temperatures.png' />
                <Warnings />
            </Tab>
        </TabSet>
    )
}
