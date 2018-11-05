import React, { Component } from 'react'
import MenuContext from 'contexts/menu'
import { Menu } from 'components/icons'
import Button, { SUBTILE } from 'components/button'

// TODO: HOOKS

export default class Toggle extends Component {
    static contextType = MenuContext
    render() {
        const { toggle } = this.context

        return (
            <Button style={STYLE} onClick={toggle} kind={SUBTILE}>
                <Menu />
            </Button>
        )
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
