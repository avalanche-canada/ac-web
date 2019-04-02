import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import { Location } from '@reach/router'
import Drawer, { LEFT } from 'components/page/drawer'
import MountainInformationNetwork from 'layouts/drawers/MountainInformationNetwork'
import WeatherStation from 'layouts/drawers/WeatherStation'
import SpecialInformation from 'layouts/drawers/SpecialInformation'
import FatalAccident from 'layouts/drawers/FatalAccident'
import MountainConditionsReport from 'layouts/drawers/MountainConditionsReport'

export default class Secondary extends PureComponent {
    static propTypes = {
        width: PropTypes.number.isRequired,
        onLocateClick: PropTypes.func.isRequired,
        onCloseClick: PropTypes.func.isRequired,
    }
    // TODO Create Context, so this.opened can be gone!!! It is used in other components
    opened = false
    renderContent = ({ location }) => {
        const { width, ...props } = this.props
        const params = new URLSearchParams(location.search)
        let opened = false
        let children = null

        if (params.has('panel')) {
            const [type, id] = params
                .get('panel')
                .split('/')
                .filter(Boolean)

            opened =
                typeof type === 'string' &&
                typeof id === 'string' &&
                Components.has(type)
            children = opened
                ? createElement(
                      Components.get(type),
                      Object.assign(props, { id })
                  )
                : null
        }

        this.opened = opened

        return (
            <Drawer open={opened} width={width} side={LEFT}>
                {children}
            </Drawer>
        )
    }
    render() {
        return <Location>{this.renderContent}</Location>
    }
}

// Components
const Components = new Map([
    ['mountain-information-network-submissions', MountainInformationNetwork],
    ['weather-stations', WeatherStation],
    ['special-information', SpecialInformation],
    ['fatal-accidents', FatalAccident],
    ['mountain-conditions-reports', MountainConditionsReport],
])
