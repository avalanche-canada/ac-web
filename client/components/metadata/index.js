import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Position } from 'components/misc'
import { useToggle } from 'hooks'
import { DateTime } from 'components/time'
import { Set, Item, createShareUrls } from 'components/social'
import css from './Metadata.css'

Metadata.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Metadata({ children, ...props }) {
    return (
        <dl {...props} className={css.Metadata}>
            {children}
        </dl>
    )
}

Entry.propTypes = {
    term: PropTypes.string,
    children: PropTypes.node.isRequired,
    horizontal: PropTypes.bool,
    className: PropTypes.string,
}

export function Entry({ term, children, horizontal, className, ...props }) {
    className = classnames(className, css.Entry, horizontal && css.Horizontal)

    return (
        <div {...props} className={className}>
            <dt className={css.Term}>{term}</dt>
            <dd className={css.Description}>{children}</dd>
        </div>
    )
}

LocationEntry.propTypes = {
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    precision: PropTypes.number,
    term: PropTypes.string,
}

export function LocationEntry({
    term = 'Location',
    longitude,
    latitude,
    precision,
}) {
    const [on, toggle] = useToggle()

    return (
        <Entry term={term} onClick={toggle} className={css.Toggleable}>
            <Position
                longitude={longitude}
                latitude={latitude}
                precision={precision}
                dms={on}
            />
        </Entry>
    )
}

ShareEntry.propTypes = {
    term: PropTypes.string,
    url: PropTypes.string,
}

export function ShareEntry({ term = null, url = document.location.href }) {
    return (
        <Entry term={term}>
            <Set>
                {createShareUrls(url).map(url => (
                    <Item
                        key={url}
                        link={url}
                        title={createTitle}
                        className={css.ShareEntryItem}
                    />
                ))}
            </Set>
        </Entry>
    )
}

TimestampEntry.propTypes = {
    term: PropTypes.string,
    value: PropTypes.instanceOf(Date),
}

export function TimestampEntry({ term, value }) {
    return (
        <Entry term={term}>
            <DateTime value={value} />
        </Entry>
    )
}

// Utils
function createTitle(provider) {
    return `Share on ${provider}`
}
