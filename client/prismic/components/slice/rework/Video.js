import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Embed } from 'prismic/components/base'
import { Media, Caption } from 'components/media'
import { StructuredText } from 'prismic/components/base'

Video.propTypes = {
    nonRepeat: PropTypes.shape({
        video: PropTypes.object.isRequired,
        caption: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

function Video({ nonRepeat }) {
    const { video, caption } = nonRepeat

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

export default memo(Video)
