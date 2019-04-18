import React from 'react'
import { storiesOf, action } from '@storybook/react'
import { Set, Item, Container } from './index'

storiesOf('Pill', module)
    .add('Pill', () => (
        <Container>
            <Set onActivate={action('onActivate')}>
                <Item>Courses</Item>
                <Item>Providers</Item>
            </Set>
        </Container>
    ))
    .add('Pill second item activated', () => (
        <Container>
            <Set activeIndex={1} onActivate={action('onActivate')}>
                <Item>Courses</Item>
                <Item>Providers</Item>
            </Set>
        </Container>
    ))
    .add('Pill none activated', () => (
        <Container>
            <Set activeIndex={null} onActivate={action('onActivate')}>
                <Item>Courses</Item>
                <Item>Providers</Item>
            </Set>
        </Container>
    ))
