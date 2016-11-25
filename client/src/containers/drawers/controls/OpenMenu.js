import React from 'react'
import {compose, withProps, withHandlers} from 'recompose'
import {connect} from 'react-redux'
import {openMenu} from 'actions/drawers'
import {Menu} from 'components/icons'
import Button, {SUBTILE} from 'components/button'

export default compose(
    connect(null, {
        openMenu,
    }),
    withProps({
        kind: SUBTILE,
        icon: <Menu />,
        inverse: true,
        style: {
            position: 'fixed',
            top: 90,
            left: 15,
            backgroundColor: 'white',
            zIndex: 2,
        }
    }),
    withHandlers({
        onClick: ({openMenu}) => event => {
            openMenu()
        }
    })
)(Button)
