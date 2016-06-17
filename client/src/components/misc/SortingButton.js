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

const SORTINGS = [NONE, ASC, DESC]
const TYPES = [NUMBER, STRING, DATE]

const COMPONENTS = new Map([
    [STRING, new Map([
        [ASC, ExpandLess],
        [DESC, ExpandMore],
        [NONE, Remove],
    ])],
    [NUMBER, new Map([
        [ASC, ExpandLess],
        [DESC, ExpandMore],
        [NONE, Remove],
    ])],
    [DATE, new Map([
        [ASC, ExpandLess],
        [DESC, ExpandMore],
        [NONE, Remove],
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

function SortingButton({ sorting = NONE, type = STRING, setSorting, onChange = K }) {
    function handleClick() {
        const next = nextSorting(sorting)

        setSorting(next)
        onChange(next)
    }

    return (
        <button styleName='Main' onClick={handleClick}>
            {createElement(COMPONENTS.get(type).get(sorting))}
        </button>
    )
}

export default compose(
    setPropTypes(propTypes),
    withState('sorting', 'setSorting', props => props.sorting)
)(CSSModules(SortingButton, styles))
