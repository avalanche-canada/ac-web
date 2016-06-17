import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Input from './Input'
import Select from './Select'
import {Dropdown, Option, Controlled as ControlledDropdown} from './Dropdown'

const outer = {
    padding: 25
}

storiesOf('Controls', module)
.add('Input', () => <Input value='Ski' />)
.add('Input type date', () => <Input type='date' />)
.add('Input type datetime', () => <Input type='datetime-local' />)
.add('Select', () => (
    <Select>
        <option value='ski'>Ski</option>
        <option value='sled'>Sled</option>
        <option value='youth'>Youth</option>
        <option value='companion-rescue'>Companion rescue</option>
    </Select>
))
.add('Dropdown', () => (
    <div style={outer}>
        <Dropdown value='companion-rescue' onChange={action('onChange')}>
            <Option value='ski'>Ski</Option>
            <Option value='sled'>Sled</Option>
            <Option value='youth'>Youth</Option>
            <Option value='companion-rescue'>Companion rescue</Option>
        </Dropdown>
    </div>
))
.add('ControlledDropdown', () => (
    <div style={outer}>
        <ControlledDropdown value='sled' onChange={action('onChange')}>
            <Option value='ski'>Ski</Option>
            <Option value='sled'>Sled</Option>
            <Option value='youth'>Youth</Option>
            <Option value='companion-rescue'>Companion rescue</Option>
        </ControlledDropdown>
    </div>
))
