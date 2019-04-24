import React from 'react'
import { useMenu } from 'contexts/menu'
import Drawer, { LEFT } from 'components/page/drawer'
import { Menu as Icon } from 'components/icons'
import Button, { SUBTILE } from 'components/button'
import Content from './Menu'

export function Menu() {
    const { opened, close } = useMenu()

    return (
        <Drawer
            side={LEFT}
            width={300}
            backdrop
            open={opened}
            onCloseClick={close}>
            <Content onCloseClick={close} />
        </Drawer>
    )
}

export function ToggleMenu() {
    const { toggle } = useMenu()

    return (
        <Button style={STYLE} onClick={toggle} kind={SUBTILE}>
            <Icon />
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
