import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import {
    Metadata,
    Entry,
    ShareEntry,
    LocationEntry,
    TimestampEntry,
} from 'components/metadata'
import { shareUrl } from 'utils/min'

MountainInformationNetworkMetadata.propTypes = {
    shareable: PropTypes.bool,
}

export default function MountainInformationNetworkMetadata({ shareable }) {
    return (
        <Consumer>
            {report =>
                report ? (
                    <Metadata>
                        <Entry term="Submitted by">{report.user}</Entry>
                        <TimestampEntry
                            term="Submitted on"
                            value={report.datetime}
                        />
                        <LocationEntry
                            longitude={report.latlng[1]}
                            latitude={report.latlng[0]}
                        />
                        {shareable && (
                            <ShareEntry url={shareUrl(report.subid)} />
                        )}
                    </Metadata>
                ) : null
            }
        </Consumer>
    )
}
