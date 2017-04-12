import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import {compose, lifecycle, withState} from 'recompose'
import {Map, Source, Layer, Popup} from './index'
import {address, company} from 'faker'

const stories = storiesOf('Map', module)

stories.addWithInfo('Basic map', () => {
    return (
        <Map>
        </Map>
    )
})
