import React from 'react'
import PropTypes from 'prop-types'
import Base from 'components/gallery'
import { Media, Caption } from 'components/media'
import { StructuredText, Image } from 'prismic/components/base'
import { Credit } from 'components/misc'
import styles from './Gallery.css'

Gallery.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.object.isRequired,
            caption: PropTypes.arrayOf(PropTypes.object),
        })
    ),
}

export default function Gallery({ items }) {
    items = items.filter(Boolean)
    const multiple = items.length > 1

    return (
        <div className={styles.Container}>
            <Base
                showBullets={multiple}
                showPlayButton={multiple}
                showThumbnails={false}
                items={items}
                renderItem={renderItem}
            />
        </div>
    )
}

// Utils
function renderItem({ image, caption, credit }) {
    return (
        <Media>
            {caption?.length > 0 && (
                <Caption>
                    <StructuredText value={caption} />
                </Caption>
            )}
            <Image {...image}>
                {credit && <Credit.Managed top>{credit}</Credit.Managed>}
            </Image>
        </Media>
    )
}
