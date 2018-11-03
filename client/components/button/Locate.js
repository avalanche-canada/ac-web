import React from 'react'
import { memo } from 'utils/react'
import Button from './Button'
import { MyLocation } from 'components/icons'
import { SUBTILE } from './kinds'

function Locate(props) {
    return (
        <Button kind={SUBTILE} {...props}>
            <MyLocation />
        </Button>
    )
}

export default memo.static(Locate)
