import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Button, { Top } from './index'

storiesOf('Button', module)
  .add('Primary button', () => <Button onClick={action('clicked')}>Button</Button>)
  .add('Secondary button', () => <Button type='Secondary'>Button</Button>)
  .add('Top Button', () => <Top/>)
