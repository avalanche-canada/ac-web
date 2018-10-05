import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'
import { Link } from '@reach/router'
import { DateElement } from 'components/time'
import { TagSet, Tag } from 'components/tag'
import { StructuredText, Image } from 'prismic/components/base'
import styles from './Feed.css'

Entry.propTypes = {
    featured: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    source: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.instanceOf(Date).isRequired,
    headline: PropTypes.shape(StructuredText.propTypes).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    link: PropTypes.string.isRequired,
    preview: PropTypes.shape(Image.propTypes),
    uid: PropTypes.string.isRequired,
    condensed: PropTypes.bool,
}

function Entry({
    featured = false,
    title,
    category,
    source,
    date,
    headline,
    tags,
    preview,
    link,
}) {
    const className = featured ? 'Entry--Featured' : 'Entry'

    return (
        <div className={styles[className]}>
            {preview && (
                <div className={styles.Image}>
                    <Image {...preview} />
                </div>
            )}
            <div className={styles.Content}>
                <h2>
                    <Link to={link}>{title}</Link>
                </h2>
                <StructuredText value={headline} />
                <ul className={styles.Metadata}>
                    {date && (
                        <li>
                            <DateElement value={date} />
                        </li>
                    )}
                    {category && <li>{category}</li>}
                    {source && <li>{source}</li>}
                </ul>
                {Array.isArray(tags) && (
                    <TagSet>
                        {tags.sort().map(tag => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </TagSet>
                )}
            </div>
        </div>
    )
}

CondensedEntry.propTypes = {
    featured: PropTypes.bool,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    source: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    link: PropTypes.string.isRequired,
}

function CondensedEntry({
    featured = false,
    title,
    category,
    source,
    date,
    link,
}) {
    const className = featured ? 'Entry--Featured' : 'Entry'

    return (
        <div className={styles[className]}>
            <div className={styles.Content}>
                <h2>
                    <Link to={link}>{title}</Link>
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

export default class EntryComponent extends StaticComponent {
    static propTypes = {
        condensed: PropTypes.bool,
    }
    render() {
        const { condensed, ...props } = this.props

        return createElement(condensed ? CondensedEntry : Entry, props)
    }
}
