import React from 'react'
import {Image} from 'components/misc'
import {Article} from 'components/page'
import {Tab, TabSet} from 'components/tab'
import Tutorial from './Tutorial'
import {Map, Layer, Source} from 'components/map'

// const irVis = 'http://msc.avalanche.ca/loops/images/AC_GDPS_BC_12hr-precip_2015111612_000HR.jpg'
const irVis = 'https://www.mapbox.com/mapbox-gl-js/assets/radar.gif'
// const irVis = 'https://avalanche.ca/assets/images/weather/new_satellite_ir_composite.png'
const coordinates = [
    [-118.3330291015624, 50.93323405874307],
    [-118.05837089843736, 50.93323405874307],
    [-118.05837089843736, 51.062875387721306],
    [-118.3330291015624, 51.062875387721306]
]
const style = {
    position: 'relative',
    height: 500,
    width: '100%'
}
const events = {
    load: event => {
        setTimeout(() => {
            event.target.resize()
        }, 1)
    }
}

export default function Satellite({tutorial}) {
    return (
        <Article title='Satellite Imagery'>
            <TabSet>
                <Tab title='Water Vapour/Jet'>
                    <Image src='http://avalanche.ca/assets/images/weather/satellite_water_vapour.png' />
                </Tab>
                <Tab title='IR Pacific'>
                    <Image src='http://avalanche.ca/assets/images/weather/new_satellite_ir_redtop.png' />
                </Tab>
                <Tab title='IR West Coast'>
                    <Image src='http://avalanche.ca/assets/images/weather/ir-west-coast.png' />
                </Tab>
                <Tab title='IR-VIS BC'>
                    <div style={style}>
                        <Map style='light' events={events}>
                            <Source id='ir-vis-bc' type='image' url={irVis} coordinates={coordinates} />
                            <Layer id='ir-vis-bc' source='ir-vis-bc' type='raster' before='place-suburb' />
                        </Map>
                    </div>
                </Tab>
                <Tab title='Tutorial'>
                    <Tutorial uid='satellite' />
                </Tab>
            </TabSet>
        </Article>
    )
}
