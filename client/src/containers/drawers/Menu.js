import React from 'react'
import {createSelector} from 'reselect'
import {compose, withProps, nest} from 'recompose'
import {connect} from 'react-redux'
import {getMenu} from 'getters/drawers'
import Drawer, {LEFT} from 'components/page/drawer'
import {closeMenu} from 'actions/drawers'
import Content from './content/Menu'

export default compose(
    connect(createSelector(
        state => getMenu(state),
        menu => ({
            open: menu.get('open')
        })
    ), {
        onCloseClick: closeMenu
    }),
    withProps({
        side: LEFT,
        width: 300,
        backdrop: true,
        children: <Content />
    }),
)(Drawer)
