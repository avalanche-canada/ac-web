import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import CSSModules from 'react-css-modules'
import {Image, InnerHTML, DateElement} from 'components/misc'
import {TagSet, Tag} from 'components/tag'
import styles from './Feed.css'

const {isArray} = Array

Entry.propTypes = {
    featured: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    source: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.instanceOf(Date).isRequired,
    headline: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    link: PropTypes.string.isRequired,
    preview: PropTypes.shape({
        url: PropTypes.string.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        alt: PropTypes.string,
    }),
    uid: PropTypes.string.isRequired,
}

function Entry({featured = false, title, category, source, date, headline, tags, preview, link}) {
    return (
        <div styleName={featured ? 'Entry--Featured' : 'Entry'}>
            {preview &&
                <div styleName='Image'>
                    <Image src={preview.url} title={preview.alt} alt={preview.alt} />
                </div>
            }
            <div styleName='Content'>
                <h2>
                    <Link to={link}>
                        {title}
                    </Link>
                </h2>
                <InnerHTML>
                    {headline}
                </InnerHTML>
                <ul styleName='Metadata'>
                    {date && <li><DateElement value={date} /></li>}
                    {category && <li>{category}</li>}
                    {source && <li>{source}</li>}
                </ul>
                {isArray(tags) &&
                    <TagSet>
                        {tags.sort().map(tag => <Tag key={tag}>{tag}</Tag>)}
                    </TagSet>
                }
            </div>
        </div>
    )
}

export default CSSModules(Entry, styles)
