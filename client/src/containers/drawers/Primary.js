import {PropTypes} from 'react'
import {compose, withProps, mapProps, getContext, withHandlers} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getPrimary} from 'selectors/drawers'
import {RIGHT} from 'components/page/drawer'
import Drawer from 'components/page/drawer'
import {pushNewLocation} from 'utils/router'

const location = {
    pathname: '/map'
}

export default compose(
    withRouter,
    getContext({
        location: PropTypes.object.isRequired,
    }),
    connect(getPrimary),
    withProps({
        side: RIGHT,
    }),
    withHandlers({
        onCloseClick: props => event => {
            pushNewLocation(location, props)
        }
    })
)(Drawer)
