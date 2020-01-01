import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { DateElement } from 'components/time'
import { StructuredText, Image } from 'prismic/components/base'
import { TagSet, Tag } from 'components/tag'
import TagTitle from './TagTitle'
import { feed } from 'router/prismic'
import styles from './Feed.css'

// TODO Should be moved to /layouts
// Build a fully generic component

Entry.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.object,
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
}

function Entry({ type, uid, tags, data }) {
    const date = data.start_date || data.date
    const preview = data?.featured_image || data?.preview_image?.Column
    const { title, category, source, shortlede } = data
    const featured = tags.includes('featured')
    const className = featured ? 'Entry--Featured' : 'Entry'

    return (
        <div className={styles[className]}>
            {preview?.url && (
                <div className={styles.Image}>
                    <Image {...preview} />
                </div>
            )}
            <div className={styles.Content}>
                <h2>
                    <Link to={feed.uid(type, uid)}>{title}</Link>
                </h2>
                <StructuredText value={shortlede} />
                <ul className={styles.Metadata}>
                    {date && (
                        <li>
                            <DateElement value={date} />
                        </li>
                    )}
                    {category && <li>{category}</li>}
                    {source && <li>{source}</li>}
                </ul>
                <TagSet>
                    {tags.sort().map(tag => (
                        <Tag key={tag}>
                            <TagTitle value={tag} />
                        </Tag>
                    ))}
                </TagSet>
            </div>
        </div>
    )
}

export function SPAW({ description, shortlede, start }) {
    return (
        <div className={styles['Entry--Featured']}>
            <div className={styles.Image}>
                <img src="https://res.cloudinary.com/avalanche-ca/image/upload/v1459287746/website/AvCan_SPAW_icon.jpg" />
            </div>
            <div className={styles.Content}>
                <h2>
                    <Link to="/spaw">{description[0].text}</Link>
                </h2>
                <StructuredText value={shortlede}></StructuredText>
                <ul className={styles.Metadata}>
                    <li>
                        <DateElement value={start} />
                    </li>
                </ul>
                <TagSet>
                    <Tag>Special Public Avalanche Warning</Tag>
                </TagSet>
            </div>
        </div>
    )
}

CondensedEntry.propTypes = {
    data: PropTypes.object,
    tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
}

function CondensedEntry({ type, uid, tags, data }) {
    const featured = tags.includes('featured')
    const date = data.start_date || data.date
    const { title, category, source } = data
    const className = featured ? 'Entry--Featured' : 'Entry'

    return (
        <div className={styles[className]}>
            <div className={styles.Content}>
                <h2>
                    <Link to={feed.uid(type, uid)}>{title}</Link>
                </h2>
                <ul className={styles.Metadata}>
                    {date && (
                        <li>
                            <DateElement value={date} />
                        </li>
                    )}
                    {category && <li>{category}</li>}
                    {source && <li>{source}</li>}
                </ul>
            </div>
        </div>
    )
}

EntryComponent.propTypes = {
    condensed: PropTypes.bool,
}

export default function EntryComponent({ condensed, ...props }) {
    return createElement(condensed ? CondensedEntry : Entry, props)
}
