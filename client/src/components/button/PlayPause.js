import React, {PropTypes} from 'react'
import {compose, setDisplayName, withProps, setPropTypes, mapProps, defaultProps} from 'recompose'
import {Play, Pause} from 'components/icons'
import Button from './Button'
import {TERTIARY} from './kinds'

const Icons = new Map([
    [true, <Pause inverse />],
    [false, <Play inverse />],
])

export default compose(
    setDisplayName('PlayPause'),
    setPropTypes({
        isPlaying: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
    }),
    defaultProps({
        isPlaying: false,
        kind: TERTIARY,
    }),
    mapProps(({isPlaying, ...rest}) => ({
        ...rest,
        icon: Icons.get(isPlaying)
    })),
)(Button)
