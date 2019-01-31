import React, { useContext } from 'react'
import Drawer, { LEFT } from 'components/page/drawer'
import MenuContext from 'contexts/menu'
import MenuContent from './Menu'

export ToggleMenu from './ToggleMenu'

export function Menu() {
    const { opened, close } = useContext(MenuContext)

    return (
        <Drawer
            side={LEFT}
            width={300}
            backdrop
            open={opened}
            onCloseClick={close}>
            <MenuContent onCloseClick={close} />
        </Drawer>
    )
}
