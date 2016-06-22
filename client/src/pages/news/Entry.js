import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import {InnerHTML, DateElement} from 'components/misc'
import styles from './News.css'

Entry.propTypes = {
    featured: PropTypes.bool,
    title: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    headline: PropTypes.string.isRequired,
    media: PropTypes.string,
    to: PropTypes.string.isRequired,
}

function Entry({featured = false, title, source, date, headline, media, to}) {
    return (
        <div styleName={featured ? 'Entry--Featured' : 'Entry'}>
            <Link to={to || '/news'}>
                <h3>{title}</h3>
            </Link>
            <InnerHTML>{headline}</InnerHTML>
            <ul styleName='Metadata'>
                <li><DateElement value={date} /></li>
                <li>{source}</li>
            </ul>
        </div>
    )
}

export default CSSModules(Entry, styles)
