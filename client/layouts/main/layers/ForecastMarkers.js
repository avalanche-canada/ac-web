import React from 'react'
import PropTypes from 'prop-types'
import { useForecastRegionsMetadata } from 'hooks/async/features'
import { Layer } from 'contexts/layers'
import { Marker } from 'components/map'
import { FORECASTS } from 'constants/drawers'

// FIXME Some issues here. Why pointer-events: none and click handler does not work...no navigation happening!

ForecastMarkers.propTypes = {
    map: PropTypes.object, // actually isRequired
    onMarkerClick: PropTypes.func.isRequired,
}

export default function ForecastMarkers(props) {
    const [regions] = useForecastRegionsMetadata()

    return (
        <Layer id={FORECASTS}>
            {layer =>
                layer.visible ? (
                    <MarkersRenderer {...props} data={regions} />
                ) : null
            }
        </Layer>
    )
}

// Utils
function MarkersRenderer({ data = [], map, onMarkerClick }) {
    return data.map(({ id, name, dangerIconUrl, centroid }) => {
        const element = document.createElement('img')

        element.classList.add('map-marker')

        Object.assign(element, {
            src: dangerIconUrl,
            width: 50,
            height: 50,
            alt: name,
            title: name,
            onclick(event) {
                event.stopPropagation()

                onMarkerClick(id)
            },
            ondragstart(event) {
                event.preventDefault()
            },
        })

        return (
            <Marker
                key={id}
                id={id}
                map={map}
                lngLat={centroid}
                element={element}
            />
        )
    })
}
