import React, { Component } from 'react'
import Drawer, { LEFT } from 'components/page/drawer'
import MenuContext from 'contexts/menu'
import MenuContent from './Menu'

export ToggleMenu from './ToggleMenu'

// TODO: HOOKS

export class Menu extends Component {
    static contextType = MenuContext
    render() {
        const { opened, close } = this.context

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
}
