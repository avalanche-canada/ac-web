import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Base from 'components/gallery'
import Image from './Image'

export default class Gallery extends PureComponent {
    static propTypes = {
        repeat: PropTypes.arrayOf(
            PropTypes.shape({
                image: PropTypes.object.isRequired,
                caption: PropTypes.arrayOf(PropTypes.object),
            })
        ),
    }
    renderItem(item) {
        return <Image nonRepeat={item} />
    }
    render() {
        const items = this.props.repeat.filter(Boolean)
        const { length } = items

        return (
            <Base
                showBullets={length > 1}
                showPlayButton={length > 1}
                showThumbnails={false}
                items={items}
                renderItem={this.renderItem}
            />
        )
    }
}
