import React, {createElement} from 'react'
import CSSModules from 'react-css-modules'
import {Media, Caption, Player} from 'components/media'
import {InnerHTML} from 'components/misc'
import styles from './Video.css'

const {assign} = Object

function Video({caption, credit, ...player}) {
    const media = {
        width: 588,
        height: 336,
    }

    if (caption || credit) {
        assign(media, {
            caption: (
                <Caption>
                    <InnerHTML>
                        {caption}
                    </InnerHTML>
                </Caption>
            )
        })
    }

    return (
        <Media {...media} >
            <Player {...player} />
        </Media>
    )
}

function VideoSet({content}) {
    const {length} = content

    return (
        <div styleName='VideoSet'>
            {content.map(props => createElement(Video, props))}
        </div>
    )
}

export default CSSModules(VideoSet, styles)
