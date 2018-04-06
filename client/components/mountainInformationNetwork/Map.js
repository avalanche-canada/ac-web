import React from 'react'
import mapbox from 'mapbox-gl/dist/mapbox-gl'
import { ContextMap } from 'components/page'
import { Marker } from 'components/map'
import min from 'components/icons/min/min-pin.png'
import minWithIncident from 'components/icons/min/min-pin-with-incident.png'
import { INCIDENT } from 'constants/min'
import { Consumer } from './Context'

export default function Map() {
    return (
        <Consumer>
            {report => {
                if (!report) {
                    return null
                }

                const [latitude, longitude] = report.latlng
                const center = new mapbox.LngLat(longitude, latitude)
                const withIncident = report.obs.some(hasIncident)
                const element = createElement({
                    title: report.title,
                    src: withIncident ? minWithIncident : min,
                })

                return (
                    <ContextMap center={center} zoom={8}>
                        <Marker element={element} lngLat={center} />
                    </ContextMap>
                )
            }}
        </Consumer>
    )
}

// Utils
function createElement(props) {
    return Object.assign(document.createElement('img'), props, {
        width: 20,
    })
}
function hasIncident(observation) {
    return observation.obtype === INCIDENT
}
