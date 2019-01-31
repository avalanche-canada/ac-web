import React, { useContext } from 'react'
import MenuContext from 'contexts/menu'
import { Menu } from 'components/icons'
import Button, { SUBTILE } from 'components/button'

export default function Toggle() {
    const { toggle } = useContext(MenuContext)

    return (
        <Button style={STYLE} onClick={toggle} kind={SUBTILE}>
            <Menu />
        </Button>
    )
}

// Style
const STYLE = {
    position: 'absolute',
    top: '0.75em',
    left: '0.75em',
    backgroundColor: 'white',
    zIndex: 13,
}
