import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Image, Video } from './index'

storiesOf('Media', module)
.add('Image', () => <Image src='http://www.avalanche.ca/assets/avalanche_canada.svg' />)
.add('Image w/ caption', () => <Image caption='Avalanche Canada' src='http://www.avalanche.ca/assets/avalanche_canada.svg' />)
.add('Video', () => <Video />)
