import {compose, withProps, mapProps, nest} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getPrimary, getSecondary, getMenu} from 'selectors/drawers'
import {LEFT, RIGHT} from 'components/page/drawer'
import {openMenu, closeMenu} from 'actions/drawers'
import Drawer from 'components/page/drawer'
import MenuContent from './Menu'
import SecondaryContent from './SecondaryContent'

export const Primary = compose(
    withRouter,
    connect(getPrimary),
    withProps({
        side: RIGHT,
    }),
    mapProps(({router, location, ...props}) => {
        return {
            ...props,
            onClose() {
                const {query} = location

                router.push({
                    pathname: '/map',
                    query,
                })
            }
        }
    })
)(Drawer)

function Branch({open, children}) {
    if (open) {
        return children
    } else {
        return null
    }
}

export const Secondary = compose(
    withRouter,
    connect(getSecondary),
    withProps({
        side: LEFT,
    }),
    mapProps(({router, location, ...props}) => ({
        ...props,
        onClose() {
            const {pathname, query} = location

            delete query.panel

            router.push({
                pathname,
                query,
            })
        }
    }))
)(nest(Drawer, Branch, SecondaryContent))


export const Menu = compose(
    connect(getMenu, {
        onOpen: openMenu,
        onClose: closeMenu,
    }),
    withProps({
        side: LEFT,
        width: 300,
        backdrop: true,
    }),
)(nest(Drawer, MenuContent))
