import React from 'react'
import { storiesOf, action } from '@storybook/react'
import Blockquote from './Blockquote'
import Footer from './Footer'

const stories = storiesOf('Blockquote', module)

stories.add('Blockquote', () => <Blockquote>Blockquote</Blockquote>)

stories.add('Blockquote w/ footer', () => (
    <Blockquote>
        Blockquote
        <Footer>Karl Guillotte</Footer>
    </Blockquote>
))
