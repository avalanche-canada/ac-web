import React from 'react'
import StaticComponent from 'components/StaticComponent'
import Panel from './Panel'
import { Texts, Descriptions, Palette } from 'constants/forecast/ates'
import styles from '../TripPlanner.css'

export default class TerrainRatingPanel extends StaticComponent {
    render() {
        return (
            <Panel header="Terrain rating explained">
                {Array.from(Palette).map(([key, color]) => (
                    <section className={styles.TerrainRatingSection} key={key}>
                        <h2 style={{ color }}>{Texts.get(key)}</h2>
                        {Descriptions.get(key)}
                    </section>
                ))}
            </Panel>
        )
    }
}
