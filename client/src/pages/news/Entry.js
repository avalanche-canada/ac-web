import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import {Metadata, Entry as MetadataEntry} from 'components/metadata'
import {Image, InnerHTML, DateElement} from 'components/misc'
import styles from './News.css'

Entry.propTypes = {
    featured: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    headline: PropTypes.string.isRequired,
    preview: PropTypes.shape({
        url: PropTypes.string.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        alt: PropTypes.string,
    }),
    uid: PropTypes.string.isRequired,
}

function Entry({featured = false, title, source, date, headline, preview, uid}) {
    return (
        <div styleName={featured ? 'Entry--Featured' : 'Entry'}>
            {preview &&
                <div styleName='Image'>
                    <Image src={preview.url} {...preview} />
                </div>
            }
            <div styleName='Content'>
                <h2>
                    <Link to={`/news/${uid}`}>
                        {title}
                    </Link>
                </h2>
                <InnerHTML>{headline}</InnerHTML>
                <ul styleName='Metadata'>
                    <li>
                        <DateElement value={date} />
                    </li>
                    {source && <li>{source}</li>}
                </ul>
            </div>
        </div>
    )
}

export default CSSModules(Entry, styles)
