import * as React from 'react'
import { useForecast } from '../Context'
import { AVALANCHE_QUEBEC } from 'constants/owners'
import AvalancheQuebecInfo from './AvalancheQuebecInfo'
import LocaleWarning from './LocaleWarning'

export default function Notifications() {
    const forecast = useForecast()

    switch (forecast.owner.value) {
        case AVALANCHE_QUEBEC:
            return <AvalancheQuebecInfo />
        default:
            return <LocaleWarning />
    }
}
