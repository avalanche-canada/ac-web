import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Metadata, Entry } from './index'
import { DateTime } from '~/components/time'

storiesOf('Metadata', module).add('Metadata', () => (
    <Metadata>
        <Entry term="Date issued">
            <DateTime />
        </Entry>
        <Entry term="Valid until">
            <DateTime />
        </Entry>
        <Entry term="Metadata 3">
            <DateTime />
        </Entry>
        <Entry term="Metadata 4">
            <DateTime />
        </Entry>
    </Metadata>
))
