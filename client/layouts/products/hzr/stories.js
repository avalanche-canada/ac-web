import React from 'react'
import { storiesOf, action } from '@storybook/react'
import {Report} from './'
import { storeDecorator } from '../../../../.storybook/decorators'

storiesOf('Hot Zone Report', module)
    .addDecorator(storeDecorator)
    .add('Hot Zone Report', () => <Report />)
