import {compose, withProps, mapProps, nest} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getPrimary, getSecondary, getMenu} from 'selectors/drawers'
import {LEFT, RIGHT} from 'components/page/drawer'
import {openMenu, closeMenu} from 'actions/drawers'
import Drawer from 'components/page/drawer'
import MenuContent from './Menu'
import {history} from 'router'

export const Primary = compose(
    withRouter,
    connect(getPrimary),
    withProps({
        side: RIGHT,
        onClose() {
            history.push('/')
        }
    }),
)(Drawer)


export const Secondary = compose(
    withRouter,
    connect(getSecondary),
    withProps({
        side: LEFT,
        onClose() {
            history.push('/')
        },
    }),
)(Drawer)


export const Menu = compose(
    connect(getMenu, {
        openMenu,
        closeMenu,
    }),
    withProps({
        side: LEFT,
        width: 300,
        backdrop: true,
    }),
    mapProps(({openMenu, closeMenu, ...props}) => {
        return {
            ...props,
            onOpen() {
                openMenu()
            },
            onClose() {
                closeMenu()
            }
        }
    })
)(nest(Drawer, MenuContent))
