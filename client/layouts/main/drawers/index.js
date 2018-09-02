import React, { PureComponent } from 'react'
import Drawer, { LEFT } from 'components/page/drawer'
import { Consumer } from 'contexts/menu'
import MenuContent from './Menu'

export ToggleMenu from './ToggleMenu'

export class Menu extends PureComponent {
    renderDrawer({ opened, close }) {
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
    render() {
        return <Consumer>{this.renderDrawer}</Consumer>
    }
}
