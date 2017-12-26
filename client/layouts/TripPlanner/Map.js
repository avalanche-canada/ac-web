import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, NavigationControl } from 'components/map'
import styles from './TripPlanner.css'

export default class TripPlannerMap extends Component {
    static propTypes = {
        onLoad: PropTypes.func.isRequired,
        children: PropTypes.node,
    }
    render() {
        return (
            <div className={styles.Map}>
                <Map style="ates" onLoad={this.props.onLoad}>
                    {this.props.children}
                    <NavigationControl />
                </Map>
            </div>
        )
    }
}
