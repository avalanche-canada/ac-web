import React from 'react'
import { KANANASKIS, AVALANCHE_QUEBEC } from 'constants/owners'
import { useForecast } from './Context'
import DefaultSidebar, {
    Kananaskis as KananaskisSidebar,
    AvalancheQuebec as AvalancheQuebecSidebar,
} from './Sidebar'
import BaseFooter, { Disclaimer, Prismic, DangerRatings } from './Footer'

export { Provider, useForecast } from './Context'
export Metadata from './Metadata'
export Headline from './Headline'
export TabSet from './TabSet'
export Notifications from './notifications'

export function Sidebar(props) {
    const forecast = useForecast()

    switch (forecast?.owner.value) {
        case KANANASKIS:
            return <KananaskisSidebar {...props} />
        case AVALANCHE_QUEBEC:
            return <AvalancheQuebecSidebar {...props} />
        default:
            return <DefaultSidebar {...props} />
    }
}

export function Footer() {
    const forecast = useForecast()

    switch (forecast?.owner.value) {
        case AVALANCHE_QUEBEC:
            return (
                <BaseFooter>
                    <Prismic uid="areas-covered-bulletin" />
                    <DangerRatings />
                    <Disclaimer uid="forecast-disclaimer-avalanche-quebec" />
                </BaseFooter>
            )
        default:
            return <BaseFooter />
    }
}
