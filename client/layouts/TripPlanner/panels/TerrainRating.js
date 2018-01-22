import React from 'react'
import StaticComponent from 'components/StaticComponent'
import Panel from './Panel'
import Ratings, {
    SIMPLE,
    Texts,
    Descriptions,
    Palette,
} from 'constants/forecast/ates'
import { WHITE, BLACK } from 'constants/forecast/palette'
import styles from '../TripPlanner.css'

export default class TerrainRatingPanel extends StaticComponent {
    getStyle(rating) {
        return {
            padding: '0.5em',
            margin: 0,
            color: rating === SIMPLE ? BLACK : WHITE,
            backgroundColor: Palette.get(rating),
        }
    }
    render() {
        return (
            <Panel header="Terrain Rating Explained">
                {Array.from(Ratings).map(rating => (
                    <section key={rating}>
                        <h2 style={this.getStyle(rating)}>
                            {Texts.get(rating)}
                        </h2>
                        <p className={styles.PanelContent}>
                            {Descriptions.get(rating)}
                        </p>
                    </section>
                ))}
            </Panel>
        )
    }
}
