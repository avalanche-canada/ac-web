import React, {PropTypes} from 'react'
import {compose, setDisplayName, setPropTypes, withProps, defaultProps} from 'recompose'
import {SUBTILE} from './kinds'
import Button from './Button'
import {Remove, Add, ExpandMore, ExpandLess} from 'components/icons'

const ICONS = new Map([
    [true, new Map([
        [true, <ExpandLess />],
        [false, <ExpandMore />],
    ])],
    [false, new Map([
        [true, <Remove />],
        [false, <Add />],
    ])],
])

export default compose(
    setDisplayName('Expand'),
    setPropTypes({
        expanded: PropTypes.bool.isRequired,
        chevron: PropTypes.bool,
    }),
    defaultProps({
        expanded: false,
        chevron: false,
    }),
    withProps(({chevron, expanded}) => ({
        kind: SUBTILE,
        icon: ICONS.get(chevron).get(expanded),
    })),
)(Button)
