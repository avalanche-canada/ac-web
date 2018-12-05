import React from 'react'
import { storiesOf, action } from '@storybook/react'
import {Report} from './'
import { storeDecorator } from '../../../../.storybook/decorators'

storiesOf('Avalanche Advisory', module)
    .addDecorator(storeDecorator)
    .add('Avalanche Advisory', () => <Report />)
