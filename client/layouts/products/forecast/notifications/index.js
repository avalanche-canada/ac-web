import * as React from 'react'
import { useForecast } from '../Context'
import * as Owners from 'constants/owners'
import AvalancheQuebecInfo from './AvalancheQuebecInfo'
import LocaleWarning from './LocaleWarning'
import * as Alert from 'components/alert'
import InnerHTML from 'components/misc/InnerHTML'
import styles from './Notifications.module.css'

export default function Notifications() {
    const { notifications = [] } = useForecast()

    return (
        <div className={styles.Set}>
            {notifications.map(notification => (
                <Notification {...notification} />
            ))}
            <Default />
        </div>
    )
}

function Default() {
    const forecast = useForecast()

    switch (forecast.owner.value) {
        case Owners.AVALANCHE_QUEBEC:
            return <AvalancheQuebecInfo />
        default:
            return <LocaleWarning />
    }
}

function Notification({ type, content }) {
    const Component = Alert.forType(type)

    return (
        <Component>
            <InnerHTML>{content}</InnerHTML>
        </Component>
    )
}
