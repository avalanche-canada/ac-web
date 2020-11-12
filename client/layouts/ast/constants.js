import { useIntlMemo } from 'hooks/intl'

export const LEVELS = new Map([
    ['AST1', 'AST 1'],
    ['AST1+', 'AST 1 + MAT'],
    ['AST1+2', 'AST 1 + AST 2 Combined'],
    ['AST2', 'AST 2'],
    ['CRS', 'Companion Rescue (CRS)'],
    ['MAT', 'Managing Avalanche Terrain (MAT)'],
])

// TODO Make LEVELS/useLevels DRYer

export function useLevels() {
    return useIntlMemo(intl => new Map([
        ['AST1', intl.formatMessage({
            defaultMessage: 'AST 1',
            description: 'Constants layouts/ast',
        })],
        ['AST1+', intl.formatMessage({
            defaultMessage: 'AST 1 + MAT',
            description: 'Constants layouts/ast',
        })],
        ['AST1+2', intl.formatMessage({
            defaultMessage: 'AST 1 + AST 2 Combined',
            description: 'Constants layouts/ast',
        })],
        ['AST2', intl.formatMessage({
            defaultMessage: 'AST 2',
            description: 'Constants layouts/ast',
        })],
        ['CRS', intl.formatMessage({
            defaultMessage: 'Companion Rescue (CRS)',
            description: 'Constants layouts/ast',
        })],
        ['MAT', intl.formatMessage({
            defaultMessage: 'Managing Avalanche Terrain (MAT)',
            description: 'Constants layouts/ast',
        })]
    ]))
}

export function useTags() {
    return useIntlMemo(intl => new Map([
        ['SKI', intl.formatMessage({
            defaultMessage: 'Ski',
            description: 'Constants layouts/ast',
        })],
        ['SLED', intl.formatMessage({
            defaultMessage: 'Sled',
            description: 'Constants layouts/ast',
        })],
        ['SNOWSHOE', intl.formatMessage({
            defaultMessage: 'Snowshoe',
            description: 'Constants layouts/ast',
        })],
        ['YOUTH', intl.formatMessage({
            defaultMessage: 'Youth',
            description: 'Constants layouts/ast',
        })]
    ]))
}

export const MINIMUM_DISTANCE = 10
