import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { ExpandLess, ExpandMore, Remove } from 'components/icons'
import Button from './Button'
import { SUBTILE } from './kinds'
import { NONE, ASC, DESC } from 'constants/sortings'

// TODO: Move to stateless, need to look at every usage

const SORTINGS = [NONE, ASC, DESC]

Sorting.propTypes = {
    sorting: PropTypes.oneOf(SORTINGS).isRequired,
    onChange: PropTypes.func.isRequired,
}

Sorting.defaultProps = {
    onChange() {},
    sorting: NONE,
}

function Sorting(props) {
    const [sorting, setSorting] = useState(props.sorting)
    function handleClick() {
        const next =
            SORTINGS[SORTINGS.indexOf(sorting.toLowerCase()) + 1] || SORTINGS[0]

        setSorting(next)
        props.onChange(next)
    }

    return (
        <Button
            onClick={handleClick}
            kind={SUBTILE}
            title={TITLES.get(sorting)}>
            {ICONS.get(sorting)}
        </Button>
    )
}

export default memo(Sorting)

// Components
const ICONS = new Map([
    [ASC, <ExpandLess />],
    [DESC, <ExpandMore />],
    [NONE, <Remove />],
])
const TITLES = new Map([
    [ASC, 'Ascending'],
    [DESC, 'Desccending'],
    [NONE, null],
])
