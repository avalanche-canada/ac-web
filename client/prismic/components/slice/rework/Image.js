import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Media, Caption } from 'components/media'
import { StructuredText, Image as Base } from 'prismic/components/base'
import Button, { INCOGNITO } from 'components/button'
import Fullscreen from 'components/Fullscreen'
import { Fullscreen as Icon } from 'components/icons'
import { PRIMARY } from 'constants/colors'
import styles from './Image.css'

export default class Image extends PureComponent {
    static propTypes = {
        nonRepeat: PropTypes.shape({
            image: PropTypes.object.isRequired,
            caption: PropTypes.arrayOf(PropTypes.object),
            credit: PropTypes.object,
        }).isRequired,
        fullscreen: PropTypes.bool,
    }
    state = {
        target: null,
    }
    setTarget = base => {
        if (!base) {
            return
        }

        this.setState({
            target: base.image,
        })
    }
    render() {
        const { fullscreen } = this.props
        const { image, caption, credit } = this.props.nonRepeat

        return (
            <Media>
                <Base ref={this.setTarget} {...image.main} credit={credit} />
                <div className={styles.ImageToolbar}>
                    {caption && (
                        <Caption>
                            <StructuredText value={caption} />
                        </Caption>
                    )}
                    {fullscreen && (
                        <Fullscreen target={this.state.target}>
                            {({ toggle }) => (
                                <Button kind={INCOGNITO} onClick={toggle}>
                                    <Icon color={PRIMARY} />
                                </Button>
                            )}
                        </Fullscreen>
                    )}
                </div>
            </Media>
        )
    }
}
