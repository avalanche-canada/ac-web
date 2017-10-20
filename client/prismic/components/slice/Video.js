import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Media, Caption, Player } from 'components/media'
import { Ribbon } from 'components/misc'
import styles from './Video.css'
import { StructuredText } from 'prismic/components/base'

Video.propTypes = {
    caption: PropTypes.string,
    credit: PropTypes.string,
    ribbonCaption: PropTypes.string,
    ribbonTitle: PropTypes.string,
}

function Video({ caption, credit, ribbonCaption, ribbonTitle, ...player }) {
    return (
        <div>
            {ribbonTitle &&
                <Ribbon caption={ribbonCaption}>
                    {ribbonTitle}
                </Ribbon>}
            <Media>
                <Player {...player} />
                {caption &&
                    <Caption>
                        <StructuredText value={caption} />
                    </Caption>}
            </Media>
        </div>
    )
}

VideoSet.propTypes = {
    // TODO: Use appropriate propType
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function VideoSet({ value }) {
    return (
        <div styleName="VideoSet">
            {value.map((props, index) => <Video key={index} {...props} />)}
        </div>
    )
}

export default CSSModules(VideoSet, styles)
