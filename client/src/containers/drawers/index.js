import React from 'react'
import {createSelector, createStructuredSelector} from 'reselect'
import {compose, withProps, defaultProps} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {isMenuOpen} from 'getters/drawers'
import Drawer, {LEFT, RIGHT} from 'components/page/drawer'
import {closeMenu} from 'actions/drawers'
import Content from './content/Menu'
import {getPrimaryDrawer, getSecondaryDrawer} from 'getters/drawers'

export ToggleMenu from './controls/ToggleMenu'

export Forecast from './content/Forecast'
export HotZoneReport from './content/HotZoneReport'

export const Primary = compose(
    withRouter,
    connect(createSelector(
        getPrimaryDrawer,
        drawer => drawer.toObject()
    )),
    defaultProps({
        side: RIGHT,
    }),
)(Drawer)

export const Secondary = compose(
    withRouter,
    defaultProps({
        side: LEFT,
    }),
    connect(createSelector(
        getSecondaryDrawer,
        drawer => drawer.toObject()
    )),
)(Drawer)

export const Menu = compose(
    connect(createStructuredSelector({
        open: isMenuOpen
    }), {
        onCloseClick: closeMenu
    }),
    withProps({
        side: LEFT,
        width: 300,
        backdrop: true,
        children: <Content />
    }),
)(Drawer)
