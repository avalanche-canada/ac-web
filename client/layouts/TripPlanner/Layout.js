import React, { PureComponent, Fragment } from 'react'
import bbox from '@turf/bbox'
import { geometryCollection } from '@turf/helpers'
import { getGeom } from '@turf/invariant'
import { Link } from '@reach/router'
import { useForecastRegionsMetadata } from 'hooks/async/features'
import Map from './Map'
import TripPlanning from './TripPlanning'
import Forecast from './Forecast'
import { Home } from 'components/links'
import Welcome from './panels/Welcome'
import Drawer, {
    Header,
    Navbar,
    Body,
    DisplayOnMap,
    Close,
    RIGHT,
    LEFT,
} from 'components/page/drawer'
import * as utils from 'utils/region'
import { useWindowSize } from 'hooks'
import { Provider as MapStateProvider } from 'contexts/map/state'
import { Screen } from 'layouts/pages'
import Button, { SUBTILE } from 'components/button'
import { Download } from 'components/icons'
import Dialog from './Download'
import styles from './TripPlanner.css'
import { FormattedMessage, useIntl } from 'react-intl'
import { useName } from 'constants/products/names'
import { FORECAST } from 'constants/products'

export default class TripPlannerLayout extends PureComponent {
    state = {
        left: true,
        right: false,
    }
    handleFeaturesSelect = next => {
        function updater(state) {
            const zone = this.createZoneState(next, state)
            const region = this.createRegionState(next, state)

            return {
                zone,
                left: Boolean(zone),
                region,
                right: Boolean(region),
            }
        }

        this.setState(updater)
    }
    createZoneState(next) {
        if (!next.zone) {
            return null
        }

        const { id, area_id, class_code } = next.zone.properties
        const areas = this.map.querySourceFeatures('composite', {
            sourceLayer: 'ates-areas',
            filter: ['==', 'id', area_id],
        })
        const [area] = areas

        return {
            id,
            rating: class_code,
            name: area.properties.name,
            features: areas,
            areaId: area_id,
        }
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
    handleMapLoad = map => {
        this.map = map
    }
    fitBounds = geometry => {
        this.map.fitBounds(bbox(geometry), {
            padding: 25,
        })
    }
    handleZoneLocateClick = () => {
        const geometries = this.state.zone.features.map(getGeom)

        this.fitBounds(geometryCollection(geometries))
    }
    handleZoneDownloadClick = () => {
        this.setState({
            showDownloadDialog: true,
        })
    }
    handleDownloadClose = () => {
        this.setState({
            showDownloadDialog: false,
        })
    }
    handleRegionLocateClick = () => {
        const { id } = this.state.region
        const region = this.regions.find(region => region.id === id)

        this.fitBounds(utils.geometry(region))
    }
    setData = ({ data }) => {
        this.regions = data

        return null
    }
    handleLeftCloseClick = () => this.setState({ left: false, zone: null })
    handleRightCloseClick = () => this.setState({ right: false })
    renderRegionHeader() {
        const { name, id } = this.state.region

        return (
            <Header subject={useName(FORECAST)}>
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
            <Fragment>
                <Navbar>
                    <Close onClick={this.handleRightCloseClick} />
                </Navbar>
                {this.renderRegionHeader()}
                <Body>
                    <Forecast id={this.state.region.id} />
                </Body>
            </Fragment>
        )
    }
    renderLeftDrawer(withRegion) {
        const { zone, region } = this.state
        const subject = (
            <FormattedMessage
                description="Layout TripPlanner/Layout"
                defaultMessage="Trip Planning"
            />
        )
        const header = (
            <Header subject={subject}>
                {zone && (
                    <HeaderContent
                        onLocateClick={this.handleZoneLocateClick}
                        onDownloadClick={this.handleZoneDownloadClick}>
                        {zone.name}
                    </HeaderContent>
                )}
            </Header>
        )

        return (
            <Fragment>
                <Navbar style={NAVBAR_STYLE}>
                    <Home style={HOME_STYLE}>
                        <FormattedMessage
                            description="Layout TripPlanner/Layout"
                            defaultMessage="Back to main map"
                        />
                    </Home>
                    <Close onClick={this.handleLeftCloseClick} />
                </Navbar>
                {withRegion || header}
                <Body>
                    {withRegion && header}
                    {zone ? (
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
            </Fragment>
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
        const { showDownloadDialog, zone } = this.state

        return (
            <Screen>
                <MapStateProvider>
                    <Map
                        {...this.state}
                        onLoad={this.handleMapLoad}
                        onFeaturesSelect={this.handleFeaturesSelect}
                    />
                    <Window>{props => this.renderDrawers(props)}</Window>
                    <Regions>{this.setData}</Regions>
                    {showDownloadDialog && (
                        <Dialog
                            onClose={this.handleDownloadClose}
                            id={zone.areaId}
                            name={zone.name}
                        />
                    )}
                </MapStateProvider>
            </Screen>
        )
    }
}

// Constants & utils
// TODO Remove that <Window> component
function Window({ children }) {
    return children(useWindowSize())
}
// TODO Remove that component once converted to functionnal component
function Regions({ children }) {
    const [data, pending] = useForecastRegionsMetadata()

    return children({ data, pending })
}
const NAVBAR_STYLE = {
    justifyContent: 'space-between',
}
const HOME_STYLE = {
    paddingLeft: '1em',
}
function HeaderContent({ children, onLocateClick, onDownloadClick }) {
    const intl = useIntl()
    const tooltip = intl.formatMessage({
        description: 'Layout TripPlanner/Layout',
        defaultMessage: 'Download ATES data as KMZ',
    })

    return (
        <h1>
            <span>{children}</span>
            <div className={styles.ButtonSet}>
                <DisplayOnMap onClick={onLocateClick} />
                <Button
                    kind={SUBTILE}
                    data-tooltip={tooltip}
                    data-tooltip-placement="left"
                    onClick={onDownloadClick}>
                    <Download />
                </Button>
            </div>
        </h1>
    )
}
