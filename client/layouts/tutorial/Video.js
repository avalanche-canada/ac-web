import React from 'react'
import PropTypes from 'prop-types'
import { Embed, StructuredText } from 'prismic/components/base'
import { Media, Caption } from 'components/media'

Video.propTypes = {
    nonRepeat: PropTypes.shape({
        video: PropTypes.object,
        caption: PropTypes.array,
    }).isRequired,
}

export default function Video(props) {
    const { video, caption } = props.nonRepeat

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
