import React, {PropTypes} from 'react'
import {Metadata, Entry, ShareEntry} from 'components/metadata'
import {DateTime} from 'components/misc'

MountainInformationNetworkMetadata.propTypes = {
    submittedOn: PropTypes.instanceOf(Date).isRequired,
    submittedBy: PropTypes.instanceOf(Date).isRequired,
    shareUrl: PropTypes.string,
}

export default function MountainInformationNetworkMetadata({
    submittedOn,
    submittedBy,
    shareUrl,
}) {
    return (
        <Metadata>
            <Entry term='Submitted by'>
                {submittedBy}
            </Entry>
            <Entry term='Submitted on'>
                <DateTime value={submittedOn} />
            </Entry>
            {shareUrl && <ShareEntry url={shareUrl} />}
            {shareUrl && <Entry />}
        </Metadata>
    )
}
