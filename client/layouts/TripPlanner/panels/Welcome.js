import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { Generic } from 'prismic/layouts'
import Panel from './Panel'
import { Entries as TerrainRatingsEntries } from './TerrainRatings'
import { Entries as MapLegendEntries } from './MapLegend'
import styles from '../TripPlanner.module.css'
import StructuredText from 'prismic/components/base/StructuredText'

export default function Welcome() {
    return (
        <section className={styles.Welcome}>
            <h2>
                <FormattedMessage
                    description="Layout TripPlanner/panels/Welcome"
                    defaultMessage="Welcome to the Trip Planner"
                />
            </h2>
            <Content />
        </section>
    )
}

export function Help() {
    const header = (
        <FormattedMessage description="Layout TripPlanner/panels/Welcome" defaultMessage="Help" />
    )

    return (
        <Panel header={header}>
            <div className={styles.PanelContent}>
                <Content />
            </div>
        </Panel>
    )
}

export function Content() {
    return (
        <Fragment>
            <Generic uid="trip-planner-welcome" />
            <Panel
                header={
                    <FormattedMessage
                        description="Layout TripPlanner/panels/Welcome"
                        defaultMessage="ATES are:"
                    />
                }
                expanded>
                <TerrainRatingsEntries />
            </Panel>
            <Panel
                header={
                    <FormattedMessage
                        description="Layout TripPlanner/panels/Welcome"
                        defaultMessage="Map legend"
                    />
                }
                expanded>
                <MapLegendEntries />
            </Panel>
            <Generic uid="how-to-download-ates-ratings">
                {({ data }) => (
                    <Panel header={data.title}>
                        <StructuredText value={data.body} />
                    </Panel>
                )}
            </Generic>
        </Fragment>
    )
}
