import React, { PureComponent, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { fullscreen } from 'compose'
import styles from './Gram.css'

@fullscreen
export default class Location extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.node).isRequired,
        enterFullscreen: PropTypes.func.isRequired,
        setFullscreenContainer: PropTypes.func.isRequired,
    }
    render() {
        const {
            children: [header, image],
            setFullscreenContainer,
            enterFullscreen,
        } = this.props

        return (
            <section className={styles.Location} onClick={enterFullscreen}>
                {header}
                {cloneElement(image, { ref: setFullscreenContainer })}
            </section>
        )
    }
}
