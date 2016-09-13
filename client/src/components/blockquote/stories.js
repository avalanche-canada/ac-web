import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import {Blockquote, Footer} from './index'

storiesOf('Blockquote', module)
.add('Blockquote', () => <Blockquote>Blockquote</Blockquote>)
.add('Blockquote w/ footer', () => (
    <Blockquote>
        Blockquote
        <Footer>Karl Guillotte</Footer>
    </Blockquote>))
