import React from 'react'
import {compose, setDisplayName, withProps} from 'recompose'
import {MyLocation} from 'components/icons'
import Button from './Button'
import {SUBTILE} from './kinds'

export default compose(
    setDisplayName('Locate'),
    withProps({
        kind: SUBTILE,
        icon: <MyLocation />,
    })
)(Button)
