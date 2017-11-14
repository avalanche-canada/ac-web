import React from 'react'
import PropTypes from 'prop-types'
import { Metadata, Entry } from 'components/metadata'

const NO_TEXT_TRANSFORM = {
    textTransform: 'none',
}

WeatherStationMetadata.propTypes = {
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    elevation: PropTypes.number.isRequired,
    utcOffset: PropTypes.number.isRequired,
    description: PropTypes.string,
    source: PropTypes.string,
    owner: PropTypes.string,
}

export default function WeatherStationMetadata({
    longitude,
    latitude,
    elevation,
    utcOffset,
    description,
    owner,
    source,
}) {
    return (
        <Metadata>
            <Entry fullWidth={true} term="Source">
                {source}
            </Entry>
            <Entry term="Longitude">
                {longitude.toPrecision(6)} °
            </Entry>
            <Entry term="Latitude">
                {latitude.toPrecision(6)} °
            </Entry>
            <Entry term="Elevation">
                <span style={NO_TEXT_TRANSFORM}>{elevation} m</span>
            </Entry>
            <Entry term="Time zone">
                UTC-0{Math.abs(utcOffset)}:00
            </Entry>
            {description &&
                <Entry title="Description">
                    {description}
                </Entry>}
            {owner &&
                typeof owner === 'object' &&
                <Entry title="Owner">
                    {owner}
                </Entry>}
        </Metadata>
    )
}
