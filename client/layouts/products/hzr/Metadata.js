import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import { Metadata, ShareEntry, TimestampEntry } from 'components/metadata'

HotZoneReportMetadata.propTypes = {
    shareUrl: PropTypes.string,
}

export default function HotZoneReportMetadata({ shareUrl }) {
    return (
        <Consumer>
            {report =>
                report ? (
                    <Metadata>
                        <TimestampEntry
                            term="Date Issued"
                            value={report.dateOfIssue}
                        />
                        <TimestampEntry
                            term="Valid Until"
                            value={report.validUntil}
                        />
                        {report.dateUpdated && (
                            <TimestampEntry
                                term="Date Updated"
                                value={report.dateUpdated}
                            />
                        )}
                        {shareUrl && <ShareEntry url={shareUrl} />}
                    </Metadata>
                ) : null
            }
        </Consumer>
    )
}
