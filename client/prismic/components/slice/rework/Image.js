import React, { PureComponent, Children, createRef } from 'react'
import PropTypes from 'prop-types'
import { Media, Caption } from 'components/media'
import { StructuredText, Image as Base } from 'prismic/components/base'
import Button, { INCOGNITO } from 'components/button'
import Fullscreen from 'components/Fullscreen'
import { Fullscreen as Icon } from 'components/icons'
import { PRIMARY } from 'constants/colors'
import styles from './Image.css'

// TODO: HOOKS

export default class Image extends PureComponent {
    static propTypes = {
        nonRepeat: PropTypes.shape({
            image: PropTypes.object.isRequired,
            caption: PropTypes.arrayOf(PropTypes.object),
            credit: PropTypes.object,
        }).isRequired,
        fullscreen: PropTypes.bool,
    }
    target = createRef()
    componentDidMount() {
        if (this.props.fullscreen) {
            this.forceUpdate()
        }
    }
    render() {
        const { fullscreen } = this.props
        const { image, caption, credit } = this.props.nonRepeat

        return (
            <Media>
                <Base ref={this.target} {...image.main} credit={credit} />
                <Toolbar>
                    {caption?.length > 0 && (
                        <Caption>
                            <StructuredText value={caption} />
                        </Caption>
                    )}
                    {fullscreen && (
                        <Fullscreen
                            target={this.target?.current?.image?.current}>
                            {({ toggle }) => (
                                <Button kind={INCOGNITO} onClick={toggle}>
                                    <Icon color={PRIMARY} />
                                </Button>
                            )}
                        </Fullscreen>
                    )}
                </Toolbar>
            </Media>
        )
    }
}

function Toolbar({ children }) {
    return Children.count(children) === 0 ? null : (
        <div className={styles.Toolbar}>{children}</div>
    )
}
