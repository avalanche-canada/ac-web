import React, { Fragment } from 'react'
import StaticComponent from 'components/StaticComponent'
import Panel from './Panel'
import { Entry, Symbol, Name, Description } from 'components/map/legend'
import Device from 'components/Device'
import RATINGS, {
    SIMPLE,
    CHALLENGING,
    COMPLEX,
    Texts,
    Descriptions,
    Palette,
} from 'constants/forecast/ates'
import styles from '../TripPlanner.css'

export default class Welcome extends StaticComponent {
    render() {
        return (
            <section className={styles.Welcome}>
                <h2>Welcome to the Trip planner</h2>
                <Content />
            </section>
        )
    }
}

export class Help extends StaticComponent {
    render() {
        return (
            <Panel header="Help">
                <div className={styles.PanelContent}>
                    <Content />
                </div>
            </Panel>
        )
    }
}

export class Content extends StaticComponent {
    renderContent = ({ isTouchable }) => (
        <Fragment>
            <p>
                {isTouchable ? 'Tap' : 'Click'} on a Avalanche Terrain Exposure
                Scale (ATES) area to start your trip planning. If you do not see
                any ATES areas, please zoom in or{' '}
                {isTouchable ? 'tap' : 'click'} on a grey zone to have the map
                zoomed in automatically.
            </p>
            <p>ATES are:</p>
            {Array.from(RATINGS).map(rating => (
                <Entry key={rating}>
                    <Symbol style={this.getStyle(rating)} />
                    <Name>{Texts.get(rating)} terrain</Name>
                    <Description>{Descriptions.get(rating)}</Description>
                </Entry>
            ))}
        </Fragment>
    )
    getStyle(rating) {
        return {
            backgroundColor: Palette.get(rating),
        }
    }
    render() {
        return <Device>{this.renderContent}</Device>
    }
}
