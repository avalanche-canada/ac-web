import React from 'react'
import PropTypes from 'prop-types'
import { Media, Caption } from 'components/media'
import { StructuredText, Embed } from 'prismic/components/base'

Video.propTypes = {
    primary: PropTypes.shape({
        video: PropTypes.object.isRequired,
        caption: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default function Video({ primary }) {
    const { video, caption } = primary

    return (
        <Media>
            <Embed oembed={video} />
            {caption?.length > 0 && (
                <Caption>
                    <StructuredText value={caption} />
                </Caption>
            )}
        </Media>
    )
}
