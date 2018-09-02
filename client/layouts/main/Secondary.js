import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Error } from 'components/text'
import Drawer, { LEFT } from 'components/page/drawer'
import MountainInformationNetwork from 'layouts/drawers/MountainInformationNetwork'
import WeatherStation from 'layouts/drawers/WeatherStation'
import ToyotaTruckReport from 'layouts/drawers/ToyotaTruckReport'
import SpecialInformation from 'layouts/drawers/SpecialInformation'
import FatalAccident from 'layouts/drawers/FatalAccident'
import MountainConditionsReport from 'layouts/drawers/MountainConditionsReport'

const Components = new Map([
    ['mountain-information-network-submissions', MountainInformationNetwork],
    ['weather-stations', WeatherStation],
    ['toyota-truck-reports', ToyotaTruckReport],
    ['special-information', SpecialInformation],
    ['fatal-accident', FatalAccident],
    ['mountain-conditions-reports', MountainConditionsReport],
])

export default class Secondary extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(Array.from(Components.keys())),
        id: PropTypes.string,
        open: PropTypes.bool.isRequired,
        width: PropTypes.number.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    get error() {
        return (
            <Error>
                Component not avaialble. Make sure you clicked properly or get
                the right URL.
            </Error>
        )
    }
    get component() {
        const { type, id, onCloseClick, onLocateClick } = this.props
        const Component = Components.get(type)
        const props = {
            id,
            onCloseClick,
            onLocateClick,
        }

        return <Component {...props} />
    }
    get content() {
        return Components.has(this.props.type) ? this.component : this.error
    }
    render() {
        const { open, width } = this.props

        return (
            <Drawer open={open} width={width} side={LEFT}>
                {open && this.content}
            </Drawer>
        )
    }
}
