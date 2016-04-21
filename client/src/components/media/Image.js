import React, { PropTypes } from 'react'
import Media from './Media'

Image.propTypes = {
    ...Media.propTypes,
    src: PropTypes.string.isRequired
}

function Image({ caption, ...rest }) {
    return (
        <Media caption={caption}>
            <img {...rest} />
        </Media>

    )
}

export default Image
