import {compose, withProps, nest} from 'recompose'
import {connect} from 'react-redux'
import {getMenu} from 'selectors/drawers'
import {LEFT} from 'components/page/drawer'
import {closeMenu} from 'actions/drawers'
import Drawer from 'components/page/drawer'
import Content from './content/Menu'

export default compose(
    connect(getMenu, {
        onCloseClick: closeMenu
    }),
    withProps({
        side: LEFT,
        width: 300,
        backdrop: true,
    }),
)(nest(Drawer, Content))
