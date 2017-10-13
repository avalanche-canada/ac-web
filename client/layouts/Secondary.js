import React, { createElement } from 'react'
import { Secondary as Base } from '~/containers/drawers'
import PropTypes from 'prop-types'
import MountainInformationNetwork from '~/containers/drawers/content/MountainInformationNetwork'
import WeatherStation from '~/containers/drawers/content/WeatherStation'
import ToyotaTruckReport from '~/containers/drawers/content/ToyotaTruckReport'
import SpecialInformation from '~/containers/drawers/content/SpecialInformation'
import FatalAccident from '~/containers/drawers/content/FatalAccident'
import MountainConditionsReport from '~/containers/drawers/content/MountainConditionsReport'
import * as Schemas from '~/api/schemas'

Secondary.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    open: PropTypes.bool,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default function Secondary({ open, type, id, location, history }) {
    const canRender = open && Components.has(type)

    return (
        <Base open={open} onCloseClick={close}>
            {canRender &&
                createElement(Components.get(type), {
                    id,
                    onCloseClick() {
                        history.push({
                            ...location,
                            search: null,
                        })
                    },
                })}
        </Base>
    )
}

const Components = new Map([
    [
        Schemas.MountainInformationNetworkSubmission.key,
        MountainInformationNetwork,
    ],
    ['weather-stations', WeatherStation],
    ['toyota-truck-reports', ToyotaTruckReport],
    ['special-information', SpecialInformation],
    ['fatal-accident', FatalAccident],
    [Schemas.MountainConditionsReport.key, MountainConditionsReport],
])
