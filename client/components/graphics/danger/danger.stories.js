import React from 'react'
import { storiesOf } from '@storybook/react'
import * as Icons from './Icons'
import * as NewIcons from './NewIcons'

function SVG({ children }) {
    return <svg xmlns="http://www.w3.org/2000/svg">{children}</svg>
}

storiesOf('Graphics/Danger/Icons/Old', module)
    .add('Low', () => (
        <SVG>
            <Icons.Low />
        </SVG>
    ))
    .add('Moderate', () => (
        <SVG>
            <Icons.Moderate />
        </SVG>
    ))
    .add('Considerable', () => (
        <SVG>
            <Icons.Considerable />
        </SVG>
    ))
    .add('High', () => (
        <SVG>
            <Icons.High />
        </SVG>
    ))
    .add('NoRating', () => (
        <SVG>
            <Icons.NoRating />
        </SVG>
    ))

storiesOf('Graphics/Danger/Icons/New', module)
    .add('Low', () => (
        <SVG>
            <NewIcons.Low />
        </SVG>
    ))
    .add('Moderate', () => (
        <SVG>
            <NewIcons.Moderate />
        </SVG>
    ))
    .add('Considerable', () => (
        <SVG>
            <NewIcons.Considerable />
        </SVG>
    ))
    .add('High', () => (
        <SVG>
            <NewIcons.High />
        </SVG>
    ))
    .add('NoRating', () => (
        <SVG>
            <NewIcons.NoRating />
        </SVG>
    ))
