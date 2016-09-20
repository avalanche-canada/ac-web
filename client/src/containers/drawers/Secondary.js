import {PropTypes} from 'react'
import {compose, withProps, mapProps, nest, getContext} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getSecondary} from 'selectors/drawers'
import {LEFT} from 'components/page/drawer'
import Drawer from 'components/page/drawer'
import Content from './content/Secondary'

function Branch({open, children}) {
    if (open) {
        return children
    } else {
        return null
    }
}

export default compose(
    withRouter,
    // TODO: There most be a better way to do that...
    getContext({
        location: PropTypes.object,
    }),
    connect(getSecondary),
    withProps({
        side: LEFT,
    }),
    mapProps(({router, location, ...props}) => ({
        ...props,
        onCloseClick() {
            const {pathname, query} = location

            delete query.panel

            router.push({
                pathname,
                query,
            })
        }
    }))
)(nest(Drawer, Branch, Content))
