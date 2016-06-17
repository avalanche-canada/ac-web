import React, {PropTypes} from 'react'
import {Image as Img} from 'components/misc'

Image.propTypes = {
    openNewTab: PropTypes.bool,
}

export default function Image({openNewTab = false, ...props}) {
    if (openNewTab) {
        return (
            <a href={props.src} title={props.alt} target='_blank'>
                <Img {...props} />
            </a>
        )
    }

    return <Img {...props} />
}
