import * as React from 'react'
import { useForecast } from '../Context'
import * as Owners from 'constants/owners'
import AvalancheQuebecInfo from './AvalancheQuebecInfo'
import LocaleWarning from './LocaleWarning'
import * as Alert from 'components/alert'
import Shim from 'components/Shim'
import InnerHTML from 'components/misc/InnerHTML'

export default function Notifications() {
    const forecast = useForecast()
    let content

    switch (forecast.owner.value) {
        case Owners.AVALANCHE_QUEBEC:
            content = <AvalancheQuebecInfo />
            break
        default:
            content = <LocaleWarning />
            break
    }

    return <Shim top>{content}</Shim>
}

function Notification({ type, content }) {
    const Component = Alert.forType(type)

    return (
        <Component>
            <InnerHTML>{content}</InnerHTML>
        </Component>
    )
}
