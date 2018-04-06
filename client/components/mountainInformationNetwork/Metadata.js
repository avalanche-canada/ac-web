import React from 'react'
import PropTypes from 'prop-types'
import {
    Metadata,
    Entry,
    ShareEntry,
    LocationEntry,
    TimestampEntry,
} from 'components/metadata'

MountainInformationNetworkMetadata.propTypes = {
    submittedBy: PropTypes.string.isRequired,
    submittedOn: PropTypes.instanceOf(Date).isRequired,
    shareUrl: PropTypes.string,
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
}

export default function MountainInformationNetworkMetadata({
    submittedOn,
    submittedBy,
    shareUrl,
    latitude,
    longitude,
}) {
    return (
        <Metadata>
            <Entry term="Submitted by">{submittedBy}</Entry>
            <TimestampEntry term="Submitted on" value={submittedOn} />
            <LocationEntry longitude={longitude} latitude={latitude} />
            {shareUrl && <ShareEntry url={shareUrl} />}
        </Metadata>
    )
}
