import React from 'react'
import { Consumer } from './Context'
import { InnerHTML } from 'components/misc'
import styles from './Forecast.css'

export default function Headline() {
    return (
        <Consumer>
            {forecast =>
                forecast ? (
                    <header className={styles.Headline}>
                        <InnerHTML>{forecast.highlights}</InnerHTML>
                    </header>
                ) : null
            }
        </Consumer>
    )
}
