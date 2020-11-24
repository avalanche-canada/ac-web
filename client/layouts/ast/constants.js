import { useIntlMemo } from 'hooks/intl'

const AST1 = 'AST1'
const AST1plus = 'AST1+'
const AST1plus2 = 'AST1+2'
const AST2 = 'AST2'
const CRS = 'CRS'
const MAT = 'MAT'

export const LEVELS = [AST1, AST1plus, AST1plus2, AST2, CRS, MAT]

export function useLevels() {
    return useIntlMemo(intl => new Map([
        [AST1, intl.formatMessage({
            defaultMessage: 'AST 1',
            description: 'Constants layouts/ast',
        })],
        [AST1plus, intl.formatMessage({
            defaultMessage: 'AST 1 + MAT',
            description: 'Constants layouts/ast',
        })],
        [AST1plus2, intl.formatMessage({
            defaultMessage: 'AST 1 + AST 2 Combined',
            description: 'Constants layouts/ast',
        })],
        [AST2, intl.formatMessage({
            defaultMessage: 'AST 2',
            description: 'Constants layouts/ast',
        })],
        [CRS, intl.formatMessage({
            defaultMessage: 'Companion Rescue (CRS)',
            description: 'Constants layouts/ast',
        })],
        [MAT, intl.formatMessage({
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
