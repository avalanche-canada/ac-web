import React, {PropTypes} from 'react'
import {compose, withProps, mapProps, getContext, withHandlers, defaultProps} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getPrimary} from 'selectors/drawers'
import {RIGHT} from 'components/page/drawer'
import Drawer from 'components/page/drawer'
import {push} from 'utils/router'
import Controls from './controls/Map'

export default compose(
    withRouter,
    getContext({
        location: PropTypes.object.isRequired,
    }),
    connect(getPrimary),
    defaultProps({
        side: RIGHT,
    }),
    withProps(({children}) => ({
        children: [<Controls />, children]
    })),
    withHandlers({
        onCloseClick: props => event => {
            push({
                pathname: '/map'
            }, props)
        }
    }),
)(Drawer)
