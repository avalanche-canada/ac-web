import React, {PropTypes} from 'react'
import {compose, withProps, setDisplayName, setPropTypes} from 'recompose'
import Button, {SUBTILE} from 'components/button'
import {Close} from 'components/icons'

export default compose(
    setPropTypes({
        onClick: PropTypes.func.isRequired,
    }),
    withProps({
        kind: SUBTILE,
        icon: <Close />,
        inverse: true,
    })
)(Button)
