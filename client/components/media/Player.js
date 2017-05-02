import React from 'react'
import { Player, Media, withMediaProps } from 'react-media-player'
import CSSModules from 'react-css-modules'
import styles from './Player.css'

function MediaPlayer(props) {
    return (
        <Media>
            <div styleName="Container">
                <div styleName="Player">
                    <Player {...props} />
                </div>
                <div styleName="Controls" />
            </div>
        </Media>
    )
}
export default withMediaProps(CSSModules(MediaPlayer, styles))
