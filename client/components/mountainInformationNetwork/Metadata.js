import React from 'react'
import PropTypes from 'prop-types'
import {compose, withProps, mapProps, setPropTypes} from 'recompose'
import {DateTime} from '~/components/misc'
import {Metadata, Entry, ShareEntry} from '~/components/metadata'
import styles from './MountainInformationNetwork.css'

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
    }),
    mapProps(({longitude, latitude}) => {
        return {
            term: 'Location',
            children: (
                <span className={styles.MapLocationWrap}>
                    <span className={styles.MapLocationItem}>
                        {roundCoordinate(longitude)}&nbsp;&deg;, {roundCoordinate(latitude)}&nbsp;&deg;
                    </span>
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
}) {
    return (
        <Metadata>
            <SubmittedBy>
                {submittedBy}
            </SubmittedBy>
            <SubmittedOn>
                {submittedOn}
            </SubmittedOn>
            <Location longitude={longitude} latitude={latitude} />
            {shareUrl && <ShareEntry url={shareUrl} />}
        </Metadata>
    )
}
