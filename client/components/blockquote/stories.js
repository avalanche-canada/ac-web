import React from 'react'
import { storiesOf } from '@storybook/react'
import { Blockquote, Footer } from './'

const stories = storiesOf('Blockquote', module)

stories.add('Blockquote', () => <Blockquote>Blockquote</Blockquote>)

stories.add('Blockquote w/ footer', () => (
    <Blockquote>
        Blockquote
        <Footer>Karl Guillotte</Footer>
    </Blockquote>
))
