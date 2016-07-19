import {compose, withProps, mapProps} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getPrimary, getSeconday} from 'selectors/drawers'
import {LEFT, RIGHT} from 'components/page/drawer'
import Drawer from 'components/page/drawer'
import {history} from 'router'

export const Primary = compose(
    withRouter,
    connect(getPrimary),
    withProps({
        side: RIGHT,
        width: 500,
    }),
    mapProps(({router, ...rest}) => {
        return {
            ...rest,
            onToggle() {
                history.push('/')
            }
        }
    }),
)(Drawer)


export const Secondary = compose(
    withRouter,
    connect(getSeconday),
    withProps({
        side: LEFT,
        width: 350,
    }),
    mapProps(({router, ...rest}) => {
        return {
            ...rest,
            onToggle() {
                history.push('/')
            },
        }
    }),
)(Drawer)
