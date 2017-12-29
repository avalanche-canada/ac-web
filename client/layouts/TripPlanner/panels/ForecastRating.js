import React from 'react'
import StaticComponent from 'components/StaticComponent'
import Panel from './Panel'
import RatingExplanation from 'components/forecast/RatingExplanation'
import styles from '../TripPlanner.css'

export default class ForecastRatingPanel extends StaticComponent {
    render() {
        return (
            <Panel header="Forecast rating explained">
                <div className={styles.ForecastRatingSection}>
                    <RatingExplanation />
                </div>
            </Panel>
        )
    }
}
