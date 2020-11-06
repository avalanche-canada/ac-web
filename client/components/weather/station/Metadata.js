import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Metadata, Entry, LocationEntry } from 'components/metadata'

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
            <Entry
                term={
                    <FormattedMessage
                        description="Component weather/station/Metadata"
                        defaultMessage="Source"
                    />
                }>
                {source}
            </Entry>
            <LocationEntry longitude={longitude} latitude={latitude} />
            <Entry
                term={
                    <FormattedMessage
                        description="Component weather/station/Metadata"
                        defaultMessage="Elevation"
                    />
                }>
                <span style={NO_TEXT_TRANSFORM}>
                    <FormattedNumber
                        description="Component weather/station/Metadata"
                        value={elevation}
                        style="unit"
                        unit="meter"
                        unitDisplay="long"
                    />
                </span>
            </Entry>
            <Entry
                term={
                    <FormattedMessage
                        description="Component weather/station/Metadata"
                        defaultMessage="Time zone"
                    />
                }>
                UTC-0{Math.abs(utcOffset)}:00
            </Entry>
            {description && (
                <Entry
                    title={
                        <FormattedMessage
                            description="Component weather/station/Metadata"
                            defaultMessage="Description"
                        />
                    }>
                    {description}
                </Entry>
            )}
            {owner && typeof owner === 'object' && (
                <Entry
                    title={
                        <FormattedMessage
                            description="Component weather/station/Metadata"
                            defaultMessage="Owner"
                        />
                    }>
                    {owner}
                </Entry>
            )}
        </Metadata>
    )
}

// Constants
const NO_TEXT_TRANSFORM = {
    textTransform: 'none',
}
