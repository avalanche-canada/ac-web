import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Base, { PanelSet, ButtonSet } from '~/components/carousel'
import Button from '~/components/button'
import { fullscreen } from '~/compose'
import styles from './Carousel.css'

@fullscreen
class Slide extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        enterFullscreen: PropTypes.func.isRequired,
        setFullscreenContainer: PropTypes.func.isRequired,
    }
    render() {
        const { children, enterFullscreen, setFullscreenContainer } = this.props

        return (
            <section
                className={styles.Slide}
                ref={setFullscreenContainer}
                onClick={enterFullscreen}>
                {children}
            </section>
        )
    }
}

export default function Carousel({ images, ...rest }) {
    return (
        <Base {...rest}>
            <PanelSet>
                {images.map((image, index) =>
                    <Slide>
                        <header>
                            Day {index + 5}
                        </header>
                        <img src={image} />
                    </Slide>
                )}
            </PanelSet>
            <ButtonSet>
                <Button chevron="LEFT">Previous</Button>
                <Button chevron="RIGHT">Next</Button>
            </ButtonSet>
        </Base>
    )
}
