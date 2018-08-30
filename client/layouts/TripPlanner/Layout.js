import React, { PureComponent, Fragment } from 'react'
import bbox from '@turf/bbox'
import { geometryCollection } from '@turf/helpers'
import { getGeom } from '@turf/invariant'
import { Link } from 'react-router-dom'
import { Regions } from 'containers/features'
import Map from './Map'
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
import styles from './TripPlanner.css'

// TODO: Could use Context to simplify implementation
// TODO: Perhaps use state machine to simplify implementation

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
    createRegionState({ region }) {
        if (region) {
            const { id, name } = region.properties

            return { id, name }
        }

        return null
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
        const { id } = this.state.region
        const region = this.regions[id]

        this.fitBounds(utils.geometry(region))
    }
    setData = ({ data }) => {
        console.warn(data)
        this.regions = data

        return null
    }
    handleLeftCloseClick = () => this.setState({ left: false, area: null })
    handleRightCloseClick = () => this.setState({ right: false })
    renderRegionHeader() {
        const { name, id } = this.state.region

        return (
            <Header subject="Avalanche forecast">
                <h1>
                    <Link to={`/forecasts/${id}`} target={id}>
                        {name}
                    </Link>
                    <DisplayOnMap onClick={this.handleRegionLocateClick} />
                </h1>
            </Header>
        )
    }
    renderRightDrawer() {
        return (
            <Container>
                <Navbar>
                    <Close onClick={this.handleRightCloseClick} />
                </Navbar>
                {this.renderRegionHeader()}
                <Body>
                    <Forecast id={this.state.region.id} />
                </Body>
            </Container>
        )
    }
    renderLeftDrawer(withRegion) {
        const { area, region } = this.state
        const header = (
            <Header subject="Trip Planning">
                {area && (
                    <h1>
                        <span>{area.name}</span>
                        <DisplayOnMap onClick={this.handleAreaLocateClick} />
                    </h1>
                )}
            </Header>
        )

        return (
            <Container>
                <Navbar style={NAVBAR_STYLE}>
                    <Home style={HOME_STYLE}>Back to main map</Home>
                    <Close onClick={this.handleLeftCloseClick} />
                </Navbar>
                {withRegion || header}
                <Body>
                    {withRegion && header}
                    {area ? (
                        <TripPlanning
                            {...this.state}
                            onElevationChange={this.handleElevationChange}
                            onDateChange={this.handleDateChange}
                        />
                    ) : (
                        <Welcome />
                    )}
                    {withRegion && this.renderRegionHeader()}
                    {withRegion && <Forecast id={region.id} />}
                </Body>
            </Container>
        )
    }
    renderDrawers({ width }) {
        const { left, region } = this.state
        const widths = this.computeDrawerWidths(width)
        const right = typeof widths.right === 'number' && this.state.right

        return (
            <Fragment>
                <Drawer side={LEFT} width={widths.left} open={left}>
                    {this.renderLeftDrawer(!right && Boolean(region))}
                </Drawer>
                <Drawer side={RIGHT} width={widths.right} open={right}>
                    {region ? this.renderRightDrawer() : null}
                </Drawer>
            </Fragment>
        )
    }
    computeDrawerWidths(width) {
        const { left } = this.state
        const prefered = Math.min(width, 500)

        if (width > 1200) {
            return {
                left: prefered,
                right: prefered,
            }
        }

        if (width > 1000) {
            return {
                left: prefered - 100,
                right: left ? prefered - 100 : prefered,
            }
        }

        if (width > 800) {
            return {
                left: prefered - 150,
                right: left ? prefered - 150 : prefered,
            }
        }

        return {
            left: prefered,
            right: left ? null : prefered,
        }
    }
    render() {
        return (
            <div className={styles.Layout}>
                <Map
                    {...this.state}
                    onLoad={this.handleMapLoad}
                    onFeaturesSelect={this.handleFeaturesSelect}
                />
                <Window>{props => this.renderDrawers(props)}</Window>
                <Regions>{this.setData}</Regions>
            </div>
        )
    }
}

// Constants
const NAVBAR_STYLE = {
    justifyContent: 'space-between',
}
const HOME_STYLE = {
    paddingLeft: '1em',
}
