import React, { Fragment } from 'react'
import Panel from './Panel'
import { isTouchable } from 'utils/device'
import { Entries as TerrainRatingsEntries } from './TerrainRatings'
import { Entries as MapLegendEntries } from './MapLegend'
import styles from '../TripPlanner.css'

export default function Welcome() {
    return (
        <section className={styles.Welcome}>
            <h2>Welcome to the Trip planner</h2>
            <Content />
        </section>
    )
}

export function Help() {
    return (
        <Panel header="Help">
            <div className={styles.PanelContent}>
                <Content />
            </div>
        </Panel>
    )
}

export function Content() {
    return (
        <Fragment>
            <p>
                {isTouchable ? 'Tap' : 'Click'} on a Avalanche Terrain Exposure
                Scale (ATES) area to start your trip planning. If you do not see
                any ATES areas, please zoom in or{' '}
                {isTouchable ? 'tap' : 'click'} on a grey zone to have the map
                zoomed in automatically.
            </p>
            <p>ATES are:</p>
            <TerrainRatingsEntries />
            <p>Map legend:</p>
            <MapLegendEntries />
        </Fragment>
    )
}
