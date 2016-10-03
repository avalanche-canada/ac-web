import React, {PropTypes} from 'react'
import {compose, withProps, getContext, withHandlers, defaultProps} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getSecondary} from 'selectors/drawers'
import Drawer, {LEFT} from 'components/page/drawer'
import Content from './content/MountainInformationNetwork'
import {pushQuery} from 'utils/router'

export default compose(
    withRouter,
    getContext({
        location: PropTypes.object.isRequired,
    }),
    defaultProps({
        side: LEFT,
    }),
    connect(getSecondary),
    withHandlers({
        onCloseClick: props => event => {
            const {query} = props.location

            delete query.panel

            pushQuery(query, props)
        }
    }),
    withProps(({open}) => {
        const children = []

        if (open === true) {
            children.push(
                <Content />
            )
        }

        return {
            children
        }
    }),
)(Drawer)
