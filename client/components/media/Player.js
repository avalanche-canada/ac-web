import React from 'react'
import PropTypes from 'prop-types'
import { Player, Media } from 'react-media-player'
import styles from './Player.css'

MediaPlayer.propTypes = {
    src: PropTypes.string.isRequired,
}

export default function MediaPlayer({ src }) {
    return (
        <Media>
            <div className={styles.Container}>
                <div className={styles.Player}>
                    <Player src={src} />
                </div>
                <div className={styles.Controls} />
            </div>
        </Media>
    )
}
