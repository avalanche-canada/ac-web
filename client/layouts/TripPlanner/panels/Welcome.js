import React, { Fragment } from 'react'
import StaticComponent from 'components/StaticComponent'
import Panel from './Panel'
import Device from 'components/Device'
import { SIMPLE, CHALLENGING, COMPLEX, Palette } from 'constants/forecast/ates'
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
    renderActions = ({ isTouchable }) => (
        <Fragment>
            <p>
                {isTouchable ? 'Tap' : 'Click'} on a ATES area to start your
                trip planning.
            </p>
            <p>
                If you do not see any ATES areas, please zoom in or{' '}
                {isTouchable ? 'tap' : 'click'} on a grey zone to have the map
                zoomed in automatically.
            </p>
        </Fragment>
    )
    getStyle(rating) {
        return {
            color: Palette.get(rating),
            fontWeight: 'bold',
        }
    }
    render() {
        return (
            <Fragment>
                <p>ATES areas are colored:</p>
                <ul>
                    <li style={this.getStyle(SIMPLE)}>
                        green for simple terrain
                    </li>
                    <li style={this.getStyle(CHALLENGING)}>
                        blue for challenging terrain
                    </li>
                    <li style={this.getStyle(COMPLEX)}>
                        black for complex terrain
                    </li>
                </ul>
                <Device>{this.renderActions}</Device>
                <p>
                    For the best experience it is recommended to use this
                    interactive tool on a computer with a full-size screen
                    rather than a mobile device. We are currenlty working to
                    make that tool "mobile friendly".
                </p>
            </Fragment>
        )
    }
}
