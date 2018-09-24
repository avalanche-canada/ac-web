import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import { Error } from 'components/text'
import Drawer, { LEFT } from 'components/page/drawer'
import MountainInformationNetwork from 'layouts/drawers/MountainInformationNetwork'
import WeatherStation from 'layouts/drawers/WeatherStation'
import ToyotaTruckReport from 'layouts/drawers/ToyotaTruckReport'
import SpecialInformation from 'layouts/drawers/SpecialInformation'
import FatalAccident from 'layouts/drawers/FatalAccident'
import MountainConditionsReport from 'layouts/drawers/MountainConditionsReport'

export default class Secondary extends PureComponent {
    static propTypes = {
        location: PropTypes.object.isRequired,
        navigate: PropTypes.func.isRequired,
        width: PropTypes.number.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    // handleClose = () => {
    //     const { navigate, location } = this.props
    //
    //     navigate(location.pathname)
    // }
    get error() {
        return (
            <Error>
                Product not avaialble. Make sure you clicked properly or get the
                right URL.
            </Error>
        )
    }
    get component() {
        const { type, id } = this.params
        const { onLocateClick } = this.props

        return createElement(Components.get(type), {
            id,
            onCloseClick: this.handleClose,
            onLocateClick,
        })
    }
    get content() {
        return Components.has(this.params.type) ? this.component : this.error
    }
    get params() {
        const { search } = this.props.location
        const params = new URLSearchParams(search)

        if (params.has('panel')) {
            const [type, id] = params.get('panel').split('/')

            return { type, id }
        }

        return {}
    }
    get opened() {
        const { type, id } = this.params

        return typeof type === 'string' && typeof id === 'string'
    }
    render() {
        const { width, opened } = this.props

        return (
            <Drawer open={opened} width={width} side={LEFT}>
                {opened ? this.content : null}
            </Drawer>
        )
    }
}

// Components
const Components = new Map([
    ['mountain-information-network-submissions', MountainInformationNetwork],
    ['weather-stations', WeatherStation],
    ['toyota-truck-reports', ToyotaTruckReport],
    ['special-information', SpecialInformation],
    ['fatal-accidents', FatalAccident],
    ['mountain-conditions-reports', MountainConditionsReport],
])
