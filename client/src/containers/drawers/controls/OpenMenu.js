import React from 'react'
import {compose, mapProps, withHandlers} from 'recompose'
import {connect} from 'react-redux'
import {openMenu} from 'actions/drawers'
import {Menu} from 'components/icons'
import Button, {SUBTILE} from 'components/button'
import {neverUpdate} from 'compose'

export default compose(
    connect(null, {
        openMenu,
    }),
    withHandlers({
        onClick: props => event => {
            props.openMenu()
        }
    }),
    mapProps(props => ({
        onClick: props.onClick,
        kind: SUBTILE,
        icon: <Menu />,
        style: {
            position: 'fixed',
            top: 90,
            left: 15,
            backgroundColor: 'white',
            zIndex: 2,
        }
    })),
    neverUpdate,
)(Button)
