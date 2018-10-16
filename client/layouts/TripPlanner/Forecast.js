import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Forecast } from 'containers/forecast'
import { Muted } from 'components/text'
import Shim from 'components/Shim'
import * as components from 'layouts/products/forecast'
import { NorthRockiesBlogFeed } from 'layouts/feed'
import { Disclaimer, DangerRatings } from 'layouts/products/forecast/Footer'
import externals from 'router/externals'
import styles from './TripPlanner.css'

export default class Content extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }
    children({ pending, data }) {
        return (
            <Fragment>
                {pending && (
                    <Shim horizontal>
                        <Muted>Loading avalanche forecast...</Muted>
                    </Shim>
                )}
                {data && (
                    <components.Forecast value={data}>
                        <Shim horizontal>
                            <components.Metadata />
                            <components.Headline />
                        </Shim>
                        <components.TabSet />
                    </components.Forecast>
                )}
                <Disclaimer />
                <DangerRatings />
            </Fragment>
        )
    }
    render() {
        const { id } = this.props

        if (id === 'north-rockies') {
            return (
                <Shim horizontal>
                    <NorthRockiesBlogFeed />
                </Shim>
            )
        }

        if (externals.has(id)) {
            return (
                <p className={styles.PanelContent}>
                    Avalanche forecast are available at:{' '}
                    <a href={externals.get(id)} target={id}>
                        {externals.get(id).replace('//', '')}
                    </a>
                </p>
            )
        }

        return <Forecast name={id}>{props => this.children(props)}</Forecast>
    }
}
