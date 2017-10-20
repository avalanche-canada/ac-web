import React from 'react'
import { compose, setDisplayName, mapProps, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { toggleMenu } from 'actions/drawers'
import { Menu } from 'components/icons'
import Button, { SUBTILE } from 'components/button'
import { neverUpdate } from 'compose'

export default compose(
    setDisplayName('ToggleMenu'),
    connect(null, {
        toggleMenu,
    }),
    withHandlers({
        onClick: props => () => {
            props.toggleMenu()
        },
    }),
    mapProps(props => ({
        onClick: props.onClick,
        kind: SUBTILE,
        icon: <Menu />,
        // shadow: true,
        style: {
            position: 'fixed',
            top: 90,
            left: 15,
            backgroundColor: 'white',
            zIndex: 13,
        },
    })),
    neverUpdate
)(Button)
