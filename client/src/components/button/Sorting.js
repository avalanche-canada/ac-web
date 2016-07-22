import React, {PropTypes} from 'react'
import {compose, setDisplayName, setPropTypes, withProps, mapProps, defaultProps, withState} from 'recompose'
import {ExpandLess, ExpandMore, Remove} from '../icons'
import {SUBTILE} from './kinds'
import Button from './Button'

function K() {}

export const ASC = 'asc'
export const DESC = 'desc'
export const NONE = null

export const NUMBER = 'number'
export const STRING = 'string'
export const DATE = 'date'

export const SORTINGS = [NONE, ASC, DESC]
export const TYPES = [NUMBER, STRING, DATE]

const expandLess = <ExpandLess />
const expandMore = <ExpandMore />
const remove = <Remove />

const ICONS = new Map([
    [STRING, new Map([
        [ASC, expandLess],
        [DESC, expandMore],
        [NONE, remove],
    ])],
    [NUMBER, new Map([
        [ASC, expandLess],
        [DESC, expandMore],
        [NONE, remove],
    ])],
    [DATE, new Map([
        [ASC, expandLess],
        [DESC, expandMore],
        [NONE, remove],
    ])],
])

function nextSorting(sorting) {
    return SORTINGS[SORTINGS.indexOf(sorting) + 1] || SORTINGS[0]
}

export default compose(
    setDisplayName('Sorting'),
    setPropTypes({
        sorting: PropTypes.oneOf(SORTINGS).isRequired,
        onChange: PropTypes.func.isRequired,
        type: PropTypes.oneOf(TYPES),
    }),
    withProps({
        kind: SUBTILE,
        type: STRING,
        onChange: K,
    }),
    mapProps(({sorting, type, onChange, setSorting, ...props}) => ({
        ...props,
        icon: ICONS.get(type).get(sorting),
        onClick() {
            const next = nextSorting(sorting)

            setSorting(next)
            onChange(next)
        }
    })),
    withState('sorting', 'setSorting', props => props.sorting),
)(Button)
