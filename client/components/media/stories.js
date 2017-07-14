import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Media, Caption, Player } from './index'

const image = <img src="http://www.avalanche.ca/assets/avalanche_canada.svg" />
const caption = (
    <Caption>
        Avalanche Canada
    </Caption>
)

storiesOf('Media', module)
    .add('Image', () => <Media>{image}</Media>)
    .add('Image w/ caption', () => <Media>{image}{caption}</Media>)
    .add('Video', () => (
        <Media>
            <Player src="https://player.vimeo.com/video/141111236" />
        </Media>
    ))
