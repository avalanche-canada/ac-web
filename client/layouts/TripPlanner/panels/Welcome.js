import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from '../TripPlanner.css'
import { Close } from 'components/button'
import Device from 'components/Device'
import { SIMPLE, CHALLENGING, COMPLEX, Palette } from 'constants/forecast/ates'

export default class Welcome extends PureComponent {
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
            <div className={styles.Welcome}>
                <header>
                    <h1>Welcome to the Trip planner</h1>
                    {this.close}
                </header>
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
            </div>
        )
    }
}
