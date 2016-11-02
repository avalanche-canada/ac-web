import React, {PropTypes} from 'react'
import {Metadata, Entry} from 'components/metadata'
import {DateTime} from 'components/misc'

const NO_TEXT_TRANSFORM = {
    textTransform: 'none'
}

WeatherStationMetadata.propTypes = {
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    elevation: PropTypes.number.isRequired,
    description: PropTypes.string,
    owner: PropTypes.string,
}

export default function WeatherStationMetadata({longitude, latitude, elevation, description, owner}) {
    return (
        <Metadata>
            <Entry term='Longitude'>
                {longitude} °
            </Entry>
            <Entry term='Latitude'>
                {latitude} °
            </Entry>
            <Entry term='Elevation'>
                <span style={NO_TEXT_TRANSFORM}>{elevation} m</span>
            </Entry>
            {description &&
                <Entry title='Description'>
                    {description}
                </Entry>
            }
            {owner &&
                <Entry title='Owner'>
                    {owner}
                </Entry>
            }
        </Metadata>
    )
}
