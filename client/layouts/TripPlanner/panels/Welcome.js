import React, { Fragment } from 'react'
import Panel from './Panel'
import { isTouchable } from 'utils/device'
import { Entries as TerrainRatingsEntries } from './TerrainRatings'
import { Entries as MapLegendEntries } from './MapLegend'
import screeenshot  from './download-instructions.jpg'
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
            <p>How to download ATES ratings:</p>
            <ol>
                <li>Zoom in on the map to find the area you are looking for.</li>
                <li>Click on the area. It will show up to the left of the map.</li>
                <li>Click on the icon with the downward arrow to the right of the area name (see image below).</li>
                <li>Read each page of the disclaimer and click “OK” to proceed.</li>
                <li>Click “Download ATES data.”</li>
            </ol>
            <img src={screeenshot} alt='Instructions for downloading data' />
        </Fragment>
    )
}
