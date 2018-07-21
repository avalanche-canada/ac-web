import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Media, Caption } from 'components/media'
import { StructuredText, Image as Base } from 'prismic/components/base'

export default class Image extends PureComponent {
    static propTypes = {
        nonRepeat: PropTypes.shape({
            image: PropTypes.object.isRequired,
            caption: PropTypes.arrayOf(PropTypes.object),
        }).isRequired,
    }
    render() {
        const { image, caption } = this.props.nonRepeat

        return (
            <Media>
                <Base {...image.main} />
                {caption.length > 0 && (
                    <Caption>
                        <StructuredText value={caption} />
                    </Caption>
                )}
            </Media>
        )
    }
}
