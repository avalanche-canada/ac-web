import React from 'react'
import StaticComponent from 'components/StaticComponent'
import { Consumer } from 'contexts/menu'
import { Menu } from 'components/icons'
import Button, { SUBTILE } from 'components/button'

export default class Toggle extends StaticComponent {
    renderButton({ toggle }) {
        return (
            <Button style={STYLE} onClick={toggle} kind={SUBTILE}>
                <Menu />
            </Button>
        )
    }
    render() {
        return <Consumer>{this.renderButton}</Consumer>
    }
}

// Style
const STYLE = {
    position: 'absolute',
    top: '0.75em',
    left: '0.75em',
    backgroundColor: 'white',
    zIndex: 13,
}
