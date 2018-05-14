import React from 'react'
import { storiesOf, action } from '@storybook/react'
import { Media, Caption } from './index'

const image = <img src="http://www.avalanche.ca/assets/avalanche_canada.svg" />
const caption = (
    <Caption>
        Avalanche Canada
    </Caption>
)

storiesOf('Media', module)
    .add('Image', () => <Media>{image}</Media>)
    .add('Image w/ caption', () => <Media>{image}{caption}</Media>)
