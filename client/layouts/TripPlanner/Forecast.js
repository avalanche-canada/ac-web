import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as containers from 'containers/forecast'
import Fetch from 'components/fetch'
import { Muted } from 'components/text'
import Shim from 'components/Shim'
import { Forecast, Metadata, Headline, TabSet } from 'layouts/products/forecast'
import { NorthRockiesBlogFeed } from 'layouts/feed'
import { Disclaimer, DangerRatings } from 'layouts/products/forecast/Footer'
import styles from './TripPlanner.css'

export default class Content extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }
    renderOtherForecast({ id, externalUrl }) {
        if (id === 'north-rockies') {
            return <NorthRockiesBlogFeed />
        }

        return externalUrl ? (
            <p className={styles.PanelContent}>
                Avalanche forecast are available at:{' '}
                <a href={externalUrl} target={id}>
                    {externalUrl}
                </a>
            </p>
        ) : null
    }
    children({ loading, data }) {
        return (
            <Fragment>
                {loading ? (
                    <Muted>Loading avalanche forecast...</Muted>
                ) : data && data.externalUrl ? (
                    <Shim horizontal>{this.renderOtherForecast(data)}</Shim>
                ) : (
                    <Forecast value={data}>
                        <Shim horizontal>
                            <Metadata />
                            <Headline />
                        </Shim>
                        <TabSet />
                    </Forecast>
                )}
                <Disclaimer />
                <DangerRatings />
            </Fragment>
        )
    }
    render() {
        return (
            <containers.Forecast name={this.props.id}>
                {props => this.children(props)}
            </containers.Forecast>
        )
    }
}
