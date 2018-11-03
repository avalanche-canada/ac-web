import React from 'react'
import { memo } from 'utils/react'
import { Consumer } from 'contexts/menu'
import { Menu } from 'components/icons'
import Button, { SUBTILE } from 'components/button'

function Toggle() {
    return (
        <Consumer>
            {({ toggle }) => (
                <Button style={STYLE} onClick={toggle} kind={SUBTILE}>
                    <Menu />
                </Button>
            )}
        </Consumer>
    )
}

export default memo.static(Toggle)

// Style
const STYLE = {
    position: 'absolute',
    top: '0.75em',
    left: '0.75em',
    backgroundColor: 'white',
    zIndex: 13,
}
