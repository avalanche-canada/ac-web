import React from 'react'
import { Provider, useForecast } from './Context'
import Metadata from './Metadata'
import Headline from './Headline'
import TabSet from './TabSet'
import DefaultSidebar, {
    Kananaskis as KananaskisSidebar,
    AvalancheQuebec as AvalancheQuebecSidebar,
} from './Sidebar'
import BaseFooter, { Disclaimer, Prismic, DangerRatings } from './Footer'
import Notifications from './notifications'
import { KANANASKIS, AVALANCHE_QUEBEC } from 'constants/owners'

export { Provider, useForecast }
export { Metadata }
export { Headline }
export { TabSet }
export { Notifications }

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
