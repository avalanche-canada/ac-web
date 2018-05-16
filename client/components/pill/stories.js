import React from 'react'
import { storiesOf, action } from '@storybook/react'
import { PillSet, Pill, Container } from './index'

storiesOf('Pill', module)
    .add('Pill', () => (
        <Container>
            <PillSet onActivate={action('onActivate')}>
                <Pill>Courses</Pill>
                <Pill>Providers</Pill>
            </PillSet>
        </Container>
    ))
    .add('Pill second item activated', () => (
        <Container>
            <PillSet activeIndex={1} onActivate={action('onActivate')}>
                <Pill>Courses</Pill>
                <Pill>Providers</Pill>
            </PillSet>
        </Container>
    ))
    .add('Pill none activated', () => (
        <Container>
            <PillSet activeIndex={null} onActivate={action('onActivate')}>
                <Pill>Courses</Pill>
                <Pill>Providers</Pill>
            </PillSet>
        </Container>
    ))
