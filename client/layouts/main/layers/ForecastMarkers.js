import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Regions } from 'containers/features'
import { Layer } from 'contexts/layers'
import { Marker } from 'components/map'
import { FORECASTS } from 'constants/drawers'

// FIXME Some issues here. Why pointer-events: none and click handler does not work...no navigation happening!

ForecastMarkers.propTypes = {
    map: PropTypes.object, // actually isRequired
    onMarkerClick: PropTypes.func.isRequired,
}

export default function ForecastMarkers(props) {
    return (
        <Layer id={FORECASTS}>
            {layer =>
                layer.visible ? (
                    <Regions>
                        {({ data }) => (
                            <MarkersRenderer {...props} data={data} />
                        )}
                    </Regions>
                ) : null
            }
        </Layer>
    )
}

// Utils
const MarkersRenderer = memo(MarkersRendererBase)

function MarkersRendererBase({ data = [], map, onMarkerClick }) {
    return data.map(({ id, name, dangerIconUrl, centroid }) => {
        const element = document.createElement('img')

        element.classList.add('map-marker')

        Object.assign(element, {
            src: dangerIconUrl,
            width: 50,
            height: 50,
            alt: name,
            title: name,
        })

        return (
            <Marker
                key={id}
                id={id}
                map={map}
                lngLat={centroid}
                element={element}
                onClick={() => {
                    onMarkerClick(id)
                }}
            />
        )
    })
}
