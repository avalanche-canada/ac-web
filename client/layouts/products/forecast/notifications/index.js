import * as React from 'react'
import { useForecast } from '../Context'
import { AVALANCHE_QUEBEC } from 'constants/owners'
import AvalancheQuebecInfo from './AvalancheQuebecInfo'
import LocaleWarning from './LocaleWarning'
import Shim from 'components/Shim'

export default function Notifications() {
    const forecast = useForecast()
    let content

    switch (forecast.owner.value) {
        case AVALANCHE_QUEBEC:
            content = <AvalancheQuebecInfo />
            break
        default:
            content = <LocaleWarning />
            break
    }

    return <Shim top>{content}</Shim>
}
