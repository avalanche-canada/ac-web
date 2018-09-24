import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Base from 'components/gallery'
import { Media, Caption } from 'components/media'
import { StructuredText, Image } from 'prismic/components/base'
import { Credit } from 'components/markup'
import styles from './Gallery.css'

export default class Gallery extends PureComponent {
    static propTypes = {
        repeat: PropTypes.arrayOf(
            PropTypes.shape({
                image: PropTypes.object.isRequired,
                caption: PropTypes.arrayOf(PropTypes.object),
            })
        ),
    }
    renderItem(item) {
        const { image, caption, credit } = item

        return (
            <Media>
                {caption?.length > 0 && (
                    <Caption>
                        <StructuredText value={caption} />
                    </Caption>
                )}
                <Image {...image.main}>
                    {credit && <Credit.Managed top>{credit}</Credit.Managed>}
                </Image>
            </Media>
        )
    }
    render() {
        const items = this.props.repeat.filter(Boolean)
        const { length } = items

        return (
            <div className={styles.Container}>
                <Base
                    showBullets={length > 1}
                    showPlayButton={length > 1}
                    showThumbnails={false}
                    items={items}
                    renderItem={this.renderItem}
                />
            </div>
        )
    }
}
