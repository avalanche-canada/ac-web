import React, { PropTypes, createElement } from 'react'
import { compose, withState, setPropTypes } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './SortingButton.css'
import { ExpandLess, ExpandMore, Remove } from '../icons'

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

const propTypes = {
    sorting: PropTypes.oneOf(SORTINGS).isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.oneOf(TYPES),
}

function SortingButton({sorting = NONE, type = STRING, setSorting, onChange = K}) {
    function handleClick() {
        const next = nextSorting(sorting)

        setSorting(next)
        onChange(next)
    }

    return (
        <button styleName='Main' onClick={handleClick}>
            {ICONS.get(type).get(sorting)}
        </button>
    )
}

export default compose(
    setPropTypes(propTypes),
    withState('sorting', 'setSorting', props => props.sorting)
)(CSSModules(SortingButton, styles))
