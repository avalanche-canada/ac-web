import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import {compose, defaultProps, withProps, renameProp} from 'recompose'
import ImageGallery from 'react-image-gallery'
import CSSModules from 'react-css-modules'
import {InnerHTML, DateElement} from 'components/misc'
import styles from './Feature.css'

export default compose(
    defaultProps({
        showThumbnails: false,
        showFullscreenButton: false,
        showPlayButton: false,
        renderItem: CSSModules(Feature, styles),
        features: new Immutable.List(),
    }),
    renameProp('features', 'items'),
    withProps(props => ({
        showBullets: props.items.size > 1
    })),
)(ImageGallery)

function Feature({name, date, headline, content}) {
    return (
        <div styleName='Content'>
            <h2>{name}</h2>
            <p>{headline}</p>
            <DateElement value={date} />
            <InnerHTML>
                {content}
            </InnerHTML>
        </div>
    )
}
