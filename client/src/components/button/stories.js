import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import {ChevronRight} from 'components/icons'
import Button, {Top, Print, PlayPause, SECONDARY, PRIMARY, INCOGNITO} from './index'

storiesOf('Button', module)
  .add('Primary button', () => <Button onClick={action('clicked')}>Button</Button>)
  .add('Secondary button', () => <Button kind={SECONDARY}>Button</Button>)
  .add('Top Button', () => <Top/>)
  .add('Print Button', () => <Print/>)
  .add('Print Button', () => <Print/>)
  .add('Create report', () => (
      <Button>
          Create report
          <ChevronRight inverse />
      </Button>
  ))
  .add('PlayPause', () => (
      <div>
          <PlayPause isPlaying />
          <PlayPause />
      </div>
  ))
