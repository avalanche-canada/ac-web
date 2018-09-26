import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Embed } from 'prismic/components/base'
import { Media, Caption } from 'components/media'
import { StructuredText } from 'prismic/components/base'

export default class Video extends PureComponent {
    static propTypes = {
        nonRepeat: PropTypes.shape({
            video: PropTypes.object.isRequired,
            caption: PropTypes.arrayOf(PropTypes.object),
        }).isRequired,
    }
    render() {
        const { video, caption } = this.props.nonRepeat

        return (
            <Media>
                <Embed oembed={video.oembed} />
                {caption.length > 0 && (
                    <Caption>
                        <StructuredText value={caption} />
                    </Caption>
                )}
            </Media>
        )
    }
}
