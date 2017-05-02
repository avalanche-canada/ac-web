import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Input from './Input'
import Select from './Select'
import { Dropdown, DropdownFromOptions, DropdownOption } from './Dropdown'

const outer = {
    padding: 25,
}

const options = new Map([
    ['ski', 'Ski'],
    ['sled', 'Sled'],
    ['youth', 'Youth'],
    ['companion-rescue', 'Companion rescue'],
])
const values = new Set(['companion-rescue', 'ski'])

storiesOf('Controls', module)
    .add('Input', () => <Input value="Ski" />)
    .add('Input type date', () => <Input type="date" />)
    .add('Input type datetime', () => <Input type="datetime-local" />)
    .add('Select', () => (
        <Select>
            <option value="ski">Ski</option>
            <option value="sled">Sled</option>
            <option value="youth">Youth</option>
            <option value="companion-rescue">Companion rescue</option>
        </Select>
    ))
    .add('Dropdown', () => (
        <div style={outer}>
            <Dropdown value="companion-rescue" onChange={action('onChange')}>
                <DropdownOption value="ski">Ski</DropdownOption>
                <DropdownOption value="sled">Sled</DropdownOption>
                <DropdownOption value="youth">Youth</DropdownOption>
                <DropdownOption value="companion-rescue">
                    Companion rescue
                </DropdownOption>
            </Dropdown>
        </div>
    ))
    .add('Dropdown multiple', () => (
        <div style={outer}>
            <Dropdown multiple value={values} onChange={action('onChange')}>
                <DropdownOption value="ski">Ski</DropdownOption>
                <DropdownOption value="sled">Sled</DropdownOption>
                <DropdownOption value="youth">Youth</DropdownOption>
                <DropdownOption value="companion-rescue">
                    Companion rescue
                </DropdownOption>
            </Dropdown>
        </div>
    ))
    .add('Dropdown from Options', () => (
        <div style={outer}>
            <DropdownFromOptions options={options} />
        </div>
    ))
