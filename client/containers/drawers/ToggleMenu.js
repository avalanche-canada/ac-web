import React from 'react'
import { connect } from 'react-redux'
import StaticComponent from 'components/StaticComponent'
import { toggleMenu } from 'actions/drawers'
import { Menu } from 'components/icons'
import Button, { SUBTILE } from 'components/button'

const STYLE = {
    position: 'absolute',
    top: '0.75em',
    left: '0.75em',
    backgroundColor: 'white',
    zIndex: 13,
}

@connect(null, { toggleMenu })
export default class ToggleMenu extends StaticComponent {
    render() {
        return (
            <Button
                style={STYLE}
                onClick={this.props.toggleMenu}
                kind={SUBTILE}>
                <Menu />
            </Button>
        )
    }
}
