import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import Button, { Top, Print, SECONDARY, PRIMARY, INCOGNITO} from './index'

storiesOf('Button', module)
  .add('Primary button', () => <Button onClick={action('clicked')}>Button</Button>)
  .add('Secondary button', () => <Button kind={SECONDARY}>Button</Button>)
  .add('Top Button', () => <Top/>)
  .add('Print Button', () => <Print/>)
