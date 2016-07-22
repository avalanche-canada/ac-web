import React, {PropTypes} from 'react'
import {compose, setDisplayName, setPropTypes, withProps, mapProps, defaultProps} from 'recompose'
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
    withProps({
        kind: SUBTILE,
    }),
    mapProps(({chevron, expanded, ...props}) => ({
        ...props,
        icon: ICONS.get(chevron).get(expanded),
    }))
)(Button)
