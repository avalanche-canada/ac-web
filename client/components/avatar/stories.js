import React from 'react'
import { storiesOf, action } from '@storybook/react'
import Avatar from './'

const path = 'avatars1.githubusercontent.com/u/744011?v=3&s=40'
const src =
    'http://msc.avalanche.ca/loops/images/AC_RDPS_BC_12hr-precip_2016052200_000HR.jpg'
const width = 825
const height = 702

storiesOf('Avatar')
    .add('w/ image', () => <Avatar name="Karl Guillotte" url={`//${path}`} />)
    .add('w/o image', () => <Avatar name="Karl Guillotte" url={path} />)
