import React from 'react'
import PropTypes from 'prop-types'
import {compose, withProps, mapProps, setPropTypes} from 'recompose'
import {DateTime} from '~/components/misc'
import {Link} from 'react-router'
import {MapLocation} from '~/components/icons'
import {Metadata, Entry, ShareEntry} from '~/components/metadata'
import {Wrapper} from '~/components/tooltip'
import styles from './MountainInformationNetwork.css'
import {MountainInformationNetworkSubmission as Schema} from '~/api/schemas'

export const SubmittedBy = compose(
    setPropTypes({
        children: PropTypes.string.isRequired,
    }),
    withProps({
        term: 'Submitted by'
    })
)(Entry)

export const SubmittedOn = compose(
    setPropTypes({
        children: PropTypes.instanceOf(Date).isRequired,
    }),
    mapProps(props => ({
        term: 'Submitted on',
        children: <DateTime value={props.children} />
    }))
)(Entry)

export const Location = compose(
    setPropTypes({
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
        link: PropTypes.string,
    }),
    mapProps(({longitude, latitude, link}) => {
        return {
            term: 'Location',
            children: (
                <span className={styles.MapLocationWrap}>
                    <span className={styles.MapLocationItem}>
                        {roundCoordinate(longitude)}&nbsp;&deg;, {roundCoordinate(latitude)}&nbsp;&deg;
                    </span>
                    {link && (
                        <Wrapper tooltip='View on Main Map'>
                            <Link to={link} className={styles.MapLocationLink}>
                                <MapLocation />
                            </Link>
                        </Wrapper>
                    )}
                </span>
            )
        }
    })
)(Entry)

MountainInformationNetworkMetadata.propTypes = {
    submittedBy: PropTypes.string.isRequired,
    submittedOn: PropTypes.instanceOf(Date).isRequired,
    shareUrl: PropTypes.string,
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    submissionId: PropTypes.string.isRequired
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
    submissionId,
}) {
    let link = null

    if (!shareUrl) {
        link = `/map?panel=${Schema.key}/${submissionId}`
    }

    return (
        <Metadata>
            <SubmittedBy>
                {submittedBy}
            </SubmittedBy>
            <SubmittedOn>
                {submittedOn}
            </SubmittedOn>
            <Location longitude={longitude} latitude={latitude} link={link} />
            {shareUrl && <ShareEntry url={shareUrl} />}
        </Metadata>
    )
}
