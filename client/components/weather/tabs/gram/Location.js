import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { fullscreen } from '~/compose'
import styles from './Gram.css'

@fullscreen
export default class Location extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        enterFullscreen: PropTypes.func.isRequired,
        setFullscreenContainer: PropTypes.func.isRequired,
    }
    render() {
        const { children, setFullscreenContainer, enterFullscreen } = this.props

        return (
            <section
                className={styles.Location}
                ref={setFullscreenContainer}
                onClick={enterFullscreen}>
                {children}
            </section>
        )
    }
}
