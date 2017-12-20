import React from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'components/time'
import { Metadata, Entry, ShareEntry, LocationEntry } from 'components/metadata'

SubmittedBy.propTypes = {
    children: PropTypes.string.isRequired,
}

export function SubmittedBy(props) {
    return <Entry term="Submitted by" {...props} />
}

SubmittedOn.propTypes = {
    children: PropTypes.instanceOf(Date).isRequired,
}

export function SubmittedOn({ children }) {
    return (
        <Entry term="Submitted on">
            <DateTime value={children} />
        </Entry>
    )
}

export const Location = LocationEntry

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
            <SubmittedBy>{submittedBy}</SubmittedBy>
            <SubmittedOn>{submittedOn}</SubmittedOn>
            <Location longitude={longitude} latitude={latitude} />
            {shareUrl && <ShareEntry url={shareUrl} />}
        </Metadata>
    )
}
