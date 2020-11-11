import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { ExpandLess, ExpandMore, Remove } from 'components/icons'
import Button from './Button'
import { SUBTILE } from './kinds'
import { NONE, ASC, DESC } from 'constants/sortings'
import { useIntl } from 'react-intl'

const SORTINGS = [NONE, ASC, DESC]

Sorting.propTypes = {
    sorting: PropTypes.oneOf(SORTINGS).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default function Sorting({ sorting = NONE, onChange = noop }) {
    const Icon = IconComponents.get(sorting)
    const titles = useTitles()
    const title = titles.get(sorting)
    function handleClick() {
        onChange(getNext(sorting))
    }

    return (
        <Button onClick={handleClick} kind={SUBTILE} title={title}>
            <Icon />
        </Button>
    )
}

// Utils components & functions
function getNext(current) {
    return SORTINGS[SORTINGS.indexOf(current.toLowerCase()) + 1] || SORTINGS[0]
}
const IconComponents = new Map([
    [ASC, ExpandLess],
    [DESC, ExpandMore],
    [NONE, Remove],
])
function useTitles() {
    const intl = useIntl()

    return useMemo(
        () =>
            new Map([
                [
                    ASC,
                    intl.formatMessage({
                        description: 'Sorting Button component',
                        defaultMessage: 'Ascending',
                    }),
                ],
                [
                    DESC,
                    intl.formatMessage({
                        description: 'Sorting Button component',
                        defaultMessage: 'Descending',
                    }),
                ],
                [NONE, null],
            ]),
        [intl.locale]
    )
}
