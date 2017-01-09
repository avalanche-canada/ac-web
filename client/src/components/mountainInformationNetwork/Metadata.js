import React, {PropTypes} from 'react'
import {DateTime} from 'components/misc'
import {Link} from 'react-router'
import {MapLocation} from 'components/icons'
import {Metadata, Entry, ShareEntry} from 'components/metadata'
import {Wrapper} from 'components/tooltip'
import styles from './MountainInformationNetwork.css'
import {MountainInformationNetworkSubmission as Schema} from 'api/schemas'

MountainInformationNetworkMetadata.propTypes = {
    submittedOn: PropTypes.instanceOf(Date).isRequired,
    submittedBy: PropTypes.instanceOf(Date).isRequired,
    shareUrl: PropTypes.string,
}

function roundCoordinate(coordinate) {
    return Math.round(coordinate * 100000) / 100000
}

export default function MountainInformationNetworkMetadata({
    submittedOn,
    submittedBy,
    shareUrl,
    latitude,
    longitude,
    submissionId
}) {

    const path = `/map?panel=${Schema.getKey()}/${submissionId}`
    const mapLink = (
        <Wrapper tooltip='View on Main Map'>
            <Link to={path} className={styles.MapLocationLink}><MapLocation /></Link>
        </Wrapper>
    )

    const loc = (
        <Entry term='Location'>
            <span className={styles.MapLocationWrap}>
                <span className={styles.MapLocationItem}>
                    {roundCoordinate(longitude)}&nbsp;&deg;, {roundCoordinate(latitude)}&nbsp;&deg;
                </span>
                {!shareUrl && mapLink}
            </span>
        </Entry>
    )
    return (
        <Metadata>
            <Entry term='Submitted by'>
                {submittedBy}
            </Entry>
            <Entry term='Submitted on'>
                <DateTime value={submittedOn} />
            </Entry>
            {loc}
            {shareUrl && <ShareEntry url={shareUrl} />}
            {shareUrl && <Entry />}
        </Metadata>
    )
}
