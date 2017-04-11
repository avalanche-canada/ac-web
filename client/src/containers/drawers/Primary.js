import React from 'react'
import PropTypes from 'prop-types'
import {compose, withProps, mapProps, getContext, withHandlers, defaultProps} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getPrimary} from '/selectors/drawers'
import {RIGHT} from '/components/page/drawer'
import Drawer from '/components/page/drawer'
import {push} from '/utils/router'
import Controls from './controls/Map'

// TODO: Find a better way to add the Controls

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
        children: [<Controls key='controls' />, children]
    })),
    withHandlers({
        onCloseClick: props => event => {
            push({
                pathname: '/map'
            }, props)
        }
    }),
)(Drawer)
