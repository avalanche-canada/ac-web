import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import { Metadata, ShareEntry, TimestampEntry } from 'components/metadata'
import * as utils from 'utils/hzr'

HotZoneReportMetadata.propTypes = {
    shareable: PropTypes.bool,
}

export default function HotZoneReportMetadata({ shareable }) {
    return (
        <Consumer>
            {report =>
                report ? (
                    <Metadata>
                        <TimestampEntry
                            term="Date Issued"
                            value={report.data.dateOfIssue}
                        />
                        <TimestampEntry
                            term="Valid Until"
                            value={report.data.validUntil}
                        />
                        {report.data.dateUpdated && (
                            <TimestampEntry
                                term="Date Updated"
                                value={report.data.dateUpdated}
                            />
                        )}
                        {shareable && (
                            <ShareEntry url={utils.shareUrl(report)} />
                        )}
                    </Metadata>
                ) : null
            }
        </Consumer>
    )
}
