import React, {Component} from 'react'
import {compose} from 'recompose'
import {withMediaPlayer, withMediaProps} from 'react-media-player'
import CSSModules from 'react-css-modules'
import {PlayPause} from 'components/button'
import styles from './Player.css'

function Player({Player, media}) {
    const {playPause, isPlaying} = media

    return (
        <div styleName="Container">
            <div styleName="Player">
                {Player}
            </div>
            <div styleName="Controls">
                <PlayPause isPlaying={isPlaying} onClick={playPause} />
                {/* <Fullscreen /> */}
            </div>
        </div>
    )
}

export default compose(
    withMediaPlayer,
    withMediaProps,
)(CSSModules(Player, styles))
