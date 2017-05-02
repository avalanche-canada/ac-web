import React from 'react'
import { createSelector, createStructuredSelector } from 'reselect'
import { compose, withProps, defaultProps } from 'recompose'
import { connect } from 'react-redux'
import {
    isMenuOpen,
    getPrimaryDrawer,
    getSecondaryDrawer,
} from '~/getters/drawers'
import Drawer, { LEFT, RIGHT } from '~/components/page/drawer'
import { closeMenu } from '~/actions/drawers'
import MenuContent from './content/Menu'

export ToggleMenu from './controls/ToggleMenu'

export Forecast from './content/Forecast'
export HotZoneReport from './content/HotZoneReport'

function drawer(side, getter) {
    return compose(
        defaultProps({
            side,
        }),
        connect(createSelector(getter, drawer => drawer.toObject()))
    )
}

export const Primary = drawer(RIGHT, getPrimaryDrawer)(Drawer)
export const Secondary = drawer(LEFT, getSecondaryDrawer)(Drawer)
export const Menu = compose(
    connect(
        createStructuredSelector({
            open: isMenuOpen,
        }),
        {
            onCloseClick: closeMenu,
        }
    ),
    withProps({
        side: LEFT,
        width: 300,
        backdrop: true,
        children: <MenuContent />,
    })
)(Drawer)
