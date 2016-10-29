import React, {PropTypes} from 'react'
import {Metadata, Entry} from 'components/metadata'
import {DateTime} from 'components/misc'

WeatherStationMetadata.propTypes = {
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    elevation: PropTypes.number.isRequired,
}

export default function WeatherStationMetadata({longitude, latitude, elevation}) {
    return (
        <Metadata>
            <Entry term='Longitude'>
                {longitude}°
            </Entry>
            <Entry term='Latitude'>
                {latitude}°
            </Entry>
            <Entry term='Elevation'>
                {elevation} m.
            </Entry>
        </Metadata>
    )
}
