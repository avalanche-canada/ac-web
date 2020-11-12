import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
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

    if (!report) {
        return null
    }

    return (
        <Metadata>
            <Entry
                term={
                    <FormattedMessage
                        description="Layout products/min/Metadata"
                        defaultMessage="Submitted by"
                    />
                }>
                {report.user}
            </Entry>
            <TimestampEntry
                term={
                    <FormattedMessage
                        description="Layout products/min/Metadata"
                        defaultMessage="Observations date"
                    />
                }
                value={report.datetime}
            />
            <LocationEntry
                longitude={report.lnglat[0]}
                latitude={report.lnglat[1]}
            />
            {shareable && <ShareEntry url={utils.shareUrl(report.subid)} />}
        </Metadata>
    )
}
