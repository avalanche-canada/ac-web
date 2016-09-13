import React, {PropTypes} from 'react'
import {compose, setDisplayName, setPropTypes, withProps, mapProps, defaultProps, withState, withHandlers} from 'recompose'
import {ExpandLess, ExpandMore, Remove} from '../icons'
import Button from './Button'
import {SUBTILE} from './kinds'

function K() {}

export const ASC = 'asc'
export const DESC = 'desc'
export const NONE = null

export const SORTINGS = [NONE, ASC, DESC]

const ICONS = new Map([
    [ASC, <ExpandLess />],
    [DESC, <ExpandMore />],
    [NONE, <Remove />],
])

function nextSorting(sorting) {
    return SORTINGS[SORTINGS.indexOf(sorting) + 1] || SORTINGS[0]
}

export default compose(
    setDisplayName('Sorting'),
    setPropTypes({
        sorting: PropTypes.oneOf(SORTINGS).isRequired,
        onChange: PropTypes.func.isRequired,
    }),
    defaultProps({
        kind: SUBTILE,
        onChange: K,
    }),
    withProps(({sorting}) => ({
        icon: ICONS.get(sorting),
    })),
    withState('sorting', 'setSorting', props => props.sorting),
    withHandlers({
        onClick: props => event => {
            const {sorting, setSorting, onChange} = props
            const next = nextSorting(sorting)

            setSorting(next)
            onChange(next)
        }
    }),
)(Button)
