import React, { PureComponent, Fragment } from 'react'
import bbox from '@turf/bbox'
import { geometryCollection } from '@turf/helpers'
import { getGeom } from '@turf/invariant'
import { Link } from 'react-router-dom'
import TripPlanner from 'containers/TripPlanner'
import TripPlannerMap from './Map'
import TripPlanning from './TripPlanning'
import Forecast from './Forecast'
import { Home } from 'components/links'
import { Window } from 'components/Dimensions'
import Welcome from './panels/Welcome'
import Drawer, {
    Header,
    Container,
    Navbar,
    Body,
    DisplayOnMap,
    Close,
    RIGHT,
    LEFT,
} from 'components/page/drawer'
import * as utils from 'utils/region'
import Tabs, {
    HeaderSet as TabsHeaderSet,
    Header as TabsHeader,
    PanelSet as TabsPanelSet,
    Panel as TabsPanel,
} from 'components/tabs'
import styles from './TripPlanner.css'

export default class TripPlannerLayout extends PureComponent {
    state = {
        left: true,
        right: false,
    }
    handleFeaturesSelect = next => {
        function updater(state) {
            const area = this.createAreaState(next, state)
            const region = this.createRegionState(next, state)

            return {
                area,
                left: Boolean(area),
                region,
                right: Boolean(region),
            }
        }

        this.setState(updater)
    }
    createAreaState(next, previous) {
        if (
            (next.area && next.region) ||
            (next.area &&
                previous.region &&
                previous.region.id === next.region.properties.id)
        ) {
            const {
                id,
                ATES_ZONE_CLASS_CODE,
                ATES_RECREATION_BNDRY_NAME,
            } = next.area.properties

            return {
                id,
                rating: ATES_ZONE_CLASS_CODE,
                name: ATES_RECREATION_BNDRY_NAME,
                features: this.map.querySourceFeatures('composite', {
                    sourceLayer: 'ates-terrain-7cew5b',
                    filter: [
                        '==',
                        'ATES_RECREATION_BNDRY_NAME',
                        ATES_RECREATION_BNDRY_NAME,
                    ],
                }),
            }
        }

        return null
    }
    createRegionState(next) {
        const { id, name } = next.region.properties

        return { id, name }
    }
    handleElevationChange = elevation => {
        this.setState({ elevation })
    }
    handleDateChange = date => {
        this.setState({ date })
    }
    handleMapLoad = ({ target }) => {
        this.map = target
    }
    fitBounds = geometry => {
        this.map.fitBounds(bbox(geometry), {
            padding: 25,
        })
    }
    handleAreaLocateClick = () => {
        const geometries = this.state.area.features.map(getGeom)

        this.fitBounds(geometryCollection(geometries))
    }
    handleRegionLocateClick = () => {
        const region = this.regions.get(this.state.region.id)

        this.fitBounds(utils.geometry(region))
    }
    setData = ({ props }) => {
        this.regions = props.regions
        this.areas = props.areas

        return null
    }
    handleLeftCloseClick = () => this.setState({ left: false, area: null })
    handleRightCloseClick = () => this.setState({ right: false })
    renderRightDrawer() {
        const { id, name } = this.state.region

        return (
            <Container>
                <Navbar>
                    <Close onClick={this.handleRightCloseClick} />
                </Navbar>
                <Header subject="Avalanche forecast">
                    <h1>
                        <Link to={`/forecasts/${id}`} target={id}>
                            {name}
                        </Link>
                        <DisplayOnMap onClick={this.handleRegionLocateClick} />
                    </h1>
                </Header>
                <Body>
                    <Forecast id={id} />
                </Body>
            </Container>
        )
    }
    renderLeftDrawer() {
        const { area } = this.state

        return (
            <Container>
                <Navbar style={NAVBAR_STYLE}>
                    <Home style={HOME_STYLE}>Back to main map</Home>
                    <Close onClick={this.handleLeftCloseClick} />
                </Navbar>
                <Body>
                    <Header subject="Trip Planning">
                        {area && (
                            <h1>
                                <span>{area.name}</span>
                                <DisplayOnMap
                                    onClick={this.handleAreaLocateClick}
                                />
                            </h1>
                        )}
                    </Header>
                    {area ? (
                        <TripPlanning
                            {...this.state}
                            onElevationChange={this.handleElevationChange}
                            onDateChange={this.handleDateChange}
                        />
                    ) : (
                        <Welcome />
                    )}
                </Body>
            </Container>
        )
    }
    renderDrawers({ width }) {
        const { left, right, region } = this.state

        return (
            <Fragment>
                <Drawer
                    side={LEFT}
                    width={Math.min(width, MAX_DRAWER_WIDTH)}
                    open={left}>
                    {this.renderLeftDrawer()}
                </Drawer>
                <Drawer
                    side={RIGHT}
                    width={Math.min(width, MAX_DRAWER_WIDTH)}
                    open={right}>
                    {region ? this.renderRightDrawer() : null}
                </Drawer>
            </Fragment>
        )
    }
    render() {
        return (
            <div className={styles.Layout}>
                <TripPlannerMap
                    {...this.state}
                    onLoad={this.handleMapLoad}
                    onFeaturesSelect={this.handleFeaturesSelect}
                />
                <Window>{props => this.renderDrawers(props)}</Window>
                <TripPlanner>{this.setData}</TripPlanner>
            </div>
        )
    }
}

// Constants
const MAX_DRAWER_WIDTH = 500
const NAVBAR_STYLE = {
    justifyContent: 'space-between',
}
const HOME_STYLE = {
    paddingLeft: '1em',
}
