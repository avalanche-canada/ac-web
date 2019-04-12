import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { Media, Caption } from 'components/media'
import { StructuredText, Image as Base } from 'prismic/components/base'
import Button, { INCOGNITO } from 'components/button'
import { Fullscreen as Icon } from 'components/icons'
import { useFullscreen } from 'utils/react/hooks'
import { PRIMARY } from 'constants/colors'
import styles from './Image.css'

Image.propTypes = {
    nonRepeat: PropTypes.shape({
        image: PropTypes.object.isRequired,
        caption: PropTypes.arrayOf(PropTypes.object),
        credit: PropTypes.object,
    }).isRequired,
    fullscreen: PropTypes.bool,
}

export default function Image({ nonRepeat, fullscreen }) {
    const { image, caption, credit } = nonRepeat
    const [ref, , , toggle] = useFullscreen()

    return (
        <Media>
            <Base imageRef={ref} {...image.main} credit={credit} />
            <Toolbar>
                {caption?.length > 0 && (
                    <Caption>
                        <StructuredText value={caption} />
                    </Caption>
                )}
                {fullscreen && (
                    <Button
                        kind={INCOGNITO}
                        className={styles.Fullscreen}
                        onClick={toggle}>
                        <Icon color={PRIMARY} />
                    </Button>
                )}
            </Toolbar>
        </Media>
    )
}

function Toolbar({ children }) {
    return Children.count(children) === 0 ? null : (
        <div className={styles.Toolbar}>{children}</div>
    )
}
