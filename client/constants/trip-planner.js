import React from 'react'

export const NOT_RECOMMENDED = 0
export const EXTRA_CAUTION = 1
export const CAUTION = 2

export default new Set([NOT_RECOMMENDED, EXTRA_CAUTION, CAUTION])

export const PALETTE = new Map([
    [NOT_RECOMMENDED, '#EC2227'],
    [EXTRA_CAUTION, '#FCEE23'],
    [CAUTION, '#12B24B'],
])

export const TEXTS = new Map([
    [NOT_RECOMMENDED, 'Not recommended'],
    [EXTRA_CAUTION, 'Extra caution'],
    [CAUTION, 'Caution'],
])

export const DESCRIPTIONS = new Map([
    [
        NOT_RECOMMENDED,
        <p>
            Backcountry travel in the red area is{' '}
            <strong>NOT RECOMMENDED</strong> without professional–level safety
            systems and guidance. Conditions are primed for avalanche accidents
            and even careful decisions can result in serious accidents. Finding
            terrain with an acceptable level of avalanche risk under these
            conditions requires detailed knowledge and comprehensive
            understanding of the development of the local snowpack to date, the
            effect of the current weather on the existing avalanche problem, and
            the small- scale characteristics of the local terrain, including
            avalanche activity history.
        </p>,
    ],
    [
        EXTRA_CAUTION,
        <p>
            Use <strong>EXTRA CAUTION</strong> in the yellow area. Avalanches
            are likely to occur with human or natural triggers, and accidents
            are frequent. Safe travelling under these conditions demands an
            advanced understanding of the character of the current avalanche
            problem. This includes knowing which field observations are most
            useful under the given conditions and which terrain features to
            favour or avoid. Advanced trip planning and group management skills,
            significant personal experience, and humility are essential.
        </p>,
    ],
    [
        CAUTION,
        <p>
            Conditions in the green area are appropriate for informed
            backcountry travel in avalanche terrain and accidents are generally
            infrequent. Use
            <strong>CAUTION</strong>, including hazard recognition and safe
            travel skills as taught in introductory avalanche courses. Rescue
            skills are always essential when travelling in avalanche terrain.
        </p>,
    ],
])
