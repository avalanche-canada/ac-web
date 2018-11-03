import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { SUBTILE } from './kinds'
import Button from './Button'
import { Remove, Add, ExpandMore, ExpandLess } from 'components/icons'

Expand.propTypes = {
    expanded: PropTypes.bool.isRequired,
    chevron: PropTypes.bool,
}

function Expand({ chevron = false, expanded = false, ...props }) {
    return (
        <Button kind={SUBTILE} {...props}>
            {ICONS.get(chevron).get(expanded)}
        </Button>
    )
}

export default memo(Expand)

const ICONS = new Map([
    [true, new Map([[true, <ExpandLess />], [false, <ExpandMore />]])],
    [false, new Map([[true, <Remove />], [false, <Add />]])],
])
