import {PropTypes} from 'react'
import {compose, withProps, mapProps, getContext} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getPrimary} from 'selectors/drawers'
import {RIGHT} from 'components/page/drawer'
import Drawer from 'components/page/drawer'

export default compose(
    withRouter,
    getContext({
        location: PropTypes.object,
    }),
    connect(getPrimary),
    withProps({
        side: RIGHT,
    }),
    mapProps(({router, location, ...props}) => {
        return {
            ...props,
            onCloseClick() {
                const {query} = location

                router.push({
                    pathname: '/map',
                    query,
                })
            }
        }
    })
)(Drawer)
