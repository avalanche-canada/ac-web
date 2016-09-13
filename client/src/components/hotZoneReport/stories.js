import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import HotZoneReport from './HotZoneReport'
import {storeDecorator} from '../../../../.storybook/decorators'

storiesOf('Hot Zone Report', module)
.addDecorator(storeDecorator)
.add('Hot Zone Report', () => <HotZoneReport  />)
