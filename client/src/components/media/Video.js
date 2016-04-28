import React, { PropTypes } from 'react'
import Media from './Media'

Video.propTypes = {
    ...Media.propTypes
}

function Video({ caption, ...rest }) {
    return (
        <Media caption={caption}>
            <video {...rest} />
        </Media>
    )
}

export default Video
