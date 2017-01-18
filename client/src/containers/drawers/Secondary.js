import React, {PropTypes, createElement} from 'react'
import {compose, withProps, getContext, withHandlers, defaultProps} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getSecondary} from 'selectors/drawers'
import Drawer, {LEFT} from 'components/page/drawer'
import MountainInformationNetwork from './content/MountainInformationNetwork'
import WeatherStation from './content/WeatherStation'
import ToyotaTruckReport from './content/ToyotaTruckReport'
import SpecialInformation from './content/SpecialInformation'
import * as Schemas from 'api/schemas'
import {push} from 'utils/router'

const ContentComponents = new Map([
    [Schemas.MountainInformationNetworkSubmission.key, MountainInformationNetwork],
    ['weather-stations', WeatherStation],
    ['toyota-truck-reports', ToyotaTruckReport],
    ['special-information', SpecialInformation],
])

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

            push({query}, props)
        }
    }),
    withProps(({open, location}) => {
        const children = []

        if (open === true) {
            const [type, id] = location.query.panel.split('/')
            const Content = ContentComponents.get(type)

            children.push(createElement(Content, {
                key: id,
                id
            }))
        }

        return {
            children
        }
    }),
)(Drawer)
