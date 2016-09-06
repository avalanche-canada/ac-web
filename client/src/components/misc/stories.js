import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import {Ribbon, Sponsor, Avatar, Br, DateElement, DateTime, Time} from './index'

const path = 'avatars1.githubusercontent.com/u/744011?v=3&s=40'
const src = 'http://msc.avalanche.ca/loops/images/AC_RDPS_BC_12hr-precip_2016052200_000HR.jpg'
const width = 825
const height = 702

storiesOf('Misc')
.add('Avatar', () => <Avatar name='Karl Guillotte' url={`//${path}`} />)
.add('Avatar w/o image', () => <Avatar name='Karl Guillotte' url={path} />)
.add('Ribbon', () => <Ribbon>Avalanche Canada</Ribbon>)
.add('Ribbon w/ custom caption', () => <Ribbon caption='custom caption'>Avalanche Canada</Ribbon>)
.add('Sponsor', () => <Sponsor name='Karl Guillotte' url={`//${path}`} />)
.add('Br', () => <Br />)
.add('Br w/ ribbon', () => <Br ribbon />)
.add('Time', () => <Time />)
.add('DateElement', () => <DateElement />)
.add('DateTime', () => <DateTime />)
