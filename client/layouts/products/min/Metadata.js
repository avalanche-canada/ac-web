import React from 'react'
import PropTypes from 'prop-types'
import { useReport } from './Context'
import {
    Metadata,
    Entry,
    ShareEntry,
    LocationEntry,
    TimestampEntry,
} from 'components/metadata'
import * as utils from 'utils/min'

MountainInformationNetworkMetadata.propTypes = {
    shareable: PropTypes.bool,
}

export default function MountainInformationNetworkMetadata({ shareable }) {
    const report = useReport()

    return report ? (
        <Metadata>
            <Entry term="Submitted by">{report.user}</Entry>
            <TimestampEntry term="Observations date" value={report.datetime} />
            <LocationEntry
                longitude={report.latlng[1]}
                latitude={report.latlng[0]}
            />
            {shareable && <ShareEntry url={utils.shareUrl(report.subid)} />}
        </Metadata>
    ) : null
}
