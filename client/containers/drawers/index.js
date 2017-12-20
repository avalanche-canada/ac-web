import React, { PureComponent } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { isMenuOpen } from 'getters/drawers'
import Drawer, { LEFT } from 'components/page/drawer'
import { closeMenu } from 'actions/drawers'
import MenuContent from './Menu'

export ToggleMenu from './ToggleMenu'

@connect(createStructuredSelector({ open: isMenuOpen }), {
    onCloseClick: closeMenu,
})
export class Menu extends PureComponent {
    render() {
        return (
            <Drawer side={LEFT} width={300} backdrop {...this.props}>
                <MenuContent onCloseClick={this.props.onCloseClick} />
            </Drawer>
        )
    }
}
