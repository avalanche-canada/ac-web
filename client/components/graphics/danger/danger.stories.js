import React from 'react'
import { storiesOf } from '@storybook/react'
import { Low, Moderate, Considerable, High, NoRating } from './Icons'

storiesOf('Graphics/Danger/Icons', module)
    .add('Low', () => (
        <svg>
            <Low />
        </svg>
    ))
    .add('Moderate', () => (
        <svg>
            <Moderate />
        </svg>
    ))
    .add('Considerable', () => (
        <svg>
            <Considerable />
        </svg>
    ))
    .add('High', () => (
        <svg>
            <High />
        </svg>
    ))
    .add('NoRating', () => (
        <svg>
            <NoRating />
        </svg>
    ))
