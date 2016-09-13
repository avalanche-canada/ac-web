import React, {PropTypes} from 'react'
import {Metadata, Entry} from 'components/metadata'
import {DateTime} from 'components/misc'

MountainInformationNetworkMetadata.propTypes = {
    submittedOn: PropTypes.instanceOf(Date).isRequired,
    submittedBy: PropTypes.instanceOf(Date).isRequired,
}

export default function MountainInformationNetworkMetadata({submittedOn, submittedBy}) {
    return (
        <Metadata>
            <Entry term='Submitted by'>
                {submittedBy}
            </Entry>
            <Entry term='Submitted on'>
                <DateTime value={submittedOn} />
            </Entry>
        </Metadata>
    )
}
