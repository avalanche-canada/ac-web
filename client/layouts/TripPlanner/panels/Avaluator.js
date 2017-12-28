import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Panel from './Panel'
import ForecastContainer from 'containers/Forecast'
import { List, Entry } from 'components/description'
import { Status } from 'components/misc'
import { LEVELS, Texts as RatingTexts } from 'constants/forecast/rating'
import { Texts as ElevationTexts } from 'constants/forecast/elevation'
import { DropdownFromOptions } from 'components/controls'
import styles from '../TripPlanner.css'

export default class AvaluatorPanel extends PureComponent {
    static propTypes = {
        header: PropTypes.string,
        region: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        terrainRating: PropTypes.oneOf([SIMPLE, CHALLENGING, COMPLEX])
            .isRequired,
    }
    static defaultProps = {
        header: 'Avaluator',
    }
    state = {
        elevation: null,
    }
    componentWillReceiveProps({ name }) {
        if (name !== this.props.name) {
            this.setState({ elevation: null })
        }
    }
    handleElevationChange = elevation => this.setState({ elevation })
    get simple() {
        return (
            <div className={styles.PanelContent}>
                <p>
                    When travelling in "Simple" terrain, you must use
                    appropriate elevation to plan properly.
                </p>
                <DropdownFromOptions
                    onChange={this.handleElevationChange}
                    value={this.state.elevation}
                    placeholder="Choose an elevation"
                    options={ElevationTexts}
                />
            </div>
        )
    }
    renderChart(forecast) {
        const dangerRatings = forecast
            .getIn(['dangerRatings', 0, 'dangerRating'])
            .toObject()
        const { terrainRating } = this.props
        let dangerRating = null

        if (terrainRating === SIMPLE) {
            const { elevation } = this.state

            if (!elevation) {
                return null
            }

            dangerRating = dangerRatings[elevation.toLowerCase()]
        } else {
            dangerRating =
                LEVELS[
                    Math.max(
                        LEVELS.indexOf(dangerRatings.alp),
                        LEVELS.indexOf(dangerRatings.tln),
                        LEVELS.indexOf(dangerRatings.btl)
                    )
                ]
        }

        return (
            <List>
                <Entry term="Terrain rating">{terrainRating}</Entry>
                <Entry term="Danger rating">
                    {RatingTexts.get(dangerRating)}
                </Entry>
            </List>
        )
    }
    renderChildren({ status, forecast }) {
        return (
            <div className={styles.PanelContent}>
                <Status {...status} />
                {this.props.terrainRating === SIMPLE && this.simple}
                {forecast && this.renderChart(forecast)}
            </div>
        )
    }
    render() {
        const { name, region, header } = this.props

        return (
            <Panel expanded header={header}>
                <header>
                    <h2>{name}</h2>
                </header>
                <ForecastContainer name={region}>
                    {data => this.renderChildren(data)}
                </ForecastContainer>
            </Panel>
        )
    }
}

// Contants
const SIMPLE = 'Simple'
const CHALLENGING = 'Challenging'
const COMPLEX = 'Complex'
