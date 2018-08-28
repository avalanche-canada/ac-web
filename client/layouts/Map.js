import React, { PureComponent, Fragment } from 'react'
import { Link, Route } from 'react-router-dom'
import bbox from '@turf/bbox'
import supported from '@mapbox/mapbox-gl-supported'
import StaticComponent from 'components/StaticComponent'
import Container from 'containers/Map'
import UnsupportedMap from './UnsupportedMap'
import { Wrapper } from 'components/tooltip'
import Device from 'components/Device'
import { captureException } from 'services/raven'
import { Warning } from 'components/icons'
import Primary from './Primary'
import Secondary from './Secondary'
import { Menu, ToggleMenu } from 'containers/drawers'
import { Provider } from 'contexts/menu'
import { parse } from 'utils/search'
import externals, { open } from 'router/externals'
import styles from './Map.css'

const MAX_DRAWER_WIDTH = 500

export default class Layout extends PureComponent {
    state = {
        hasError: false,
        secondary: isSecondaryOpen(this.props.location),
        primary: isPrimaryOpen(this.props.match),
        width: Math.min(MAX_DRAWER_WIDTH, window.innerWidth),
    }
    flyTo() {}
    fitBounds() {}
    get offset() {
        const { primary, secondary, width } = this.state
        let x = 0

        if (primary) {
            x -= width / 2
        }
        if (secondary) {
            x += width / 2
        }

        return [x, 0]
    }
    handleError = error => {
        this.setState({ hasError: true }, () => {
            captureException(error)
        })
    }
    handleLoad = ({ target }) => {
        this.flyTo = center => {
            target.flyTo({
                center,
                zoom: 13,
                offset: this.offset,
            })
        }
        this.fitBounds = geometry => {
            target.fitBounds(bbox(geometry), {
                offset: this.offset,
                padding: 75,
                speed: 1.75,
            })
        }

        target.on('resize', this.handleResize)
    }
    handleResize = event => {
        const container = event.target.getContainer()

        this.setState({
            width: Math.min(MAX_DRAWER_WIDTH, container.clientWidth),
        })
    }
    handleLocateClick = geometry => {
        if (geometry.type === 'Point') {
            this.flyTo(geometry.coordinates)
        } else {
            this.fitBounds(geometry)
        }
    }
    handlePrimaryCloseClick = () => {
        this.setState({ primary: false }, () => {
            this.props.history.push({
                ...this.props.location,
                pathname: '/map',
            })
        })
    }
    handleSecondaryCloseClick = () => {
        this.setState({ secondary: false }, () => {
            this.props.history.push({
                ...this.props.location,
                search: null,
            })
        })
    }
    componentDidMount() {
        this.tryOpenExternal()
    }
    componentDidUpdate({ location }) {
        if (location.pathname !== this.props.location.pathname) {
            this.tryOpenExternal()
        }
    }
    componentWillReceiveProps({ location, match }) {
        if (location !== this.props.location) {
            this.setState({
                secondary: isSecondaryOpen(location),
                primary: isPrimaryOpen(match),
            })
        }
    }
    tryOpenExternal() {
        const { type, name } = this.props.match.params

        if (type === 'forecasts') {
            open(name)
        }
    }
    primary = ({ location }) => {
        const { width, primary } = this.state

        return (
            <Primary
                width={width}
                open={primary}
                location={location}
                onCloseClick={this.handlePrimaryCloseClick}
                onLocateClick={this.handleLocateClick}
            />
        )
    }
    secondary = ({ location }) => {
        const { width, secondary } = this.state
        const { panel = '' } = parse(location.search)
        const [type, id] = panel.split('/')

        return (
            <Secondary
                type={type}
                id={id}
                width={width}
                open={secondary}
                onCloseClick={this.handleSecondaryCloseClick}
                onLocateClick={this.handleLocateClick}
            />
        )
    }
    render() {
        if (supported()) {
            return (
                <Provider>
                    <div className={styles.Layout}>
                        <Container
                            onError={this.handleError}
                            onLoad={this.handleLoad}
                        />
                        {/* Orders matter here for the route components */}
                        <Route path="/map*">{this.secondary}</Route>
                        <Route path="/map/:type/:name">{this.primary}</Route>
                        <Menu />
                        <ToggleMenu />
                        <LinkControlSet>
                            {this.state.hasError && <ErrorIndicator />}
                        </LinkControlSet>
                    </div>
                </Provider>
            )
        }

        return <UnsupportedMap />
    }
}

function isSecondaryOpen(location) {
    const { panel = '' } = parse(location.search)
    const [type, id] = panel.split('/')

    return typeof type === 'string' && typeof id === 'string'
}

function isPrimaryOpen({ params: { type, name } }) {
    return (
        typeof type === 'string' &&
        typeof name === 'string' &&
        !externals.has(name)
    )
}

class LinkControlSet extends PureComponent {
    get tooltips() {
        const style = {
            maxWidth: 175,
            padding: '0.25em',
        }

        return [
            <div key="min" style={style}>
                Create a Mountain Information Network (MIN) report
            </div>,
            <div key="mwf" style={{ ...style, maxWidth: 125 }}>
                Visit the Mountain Weather Forecast
            </div>,
        ]
    }
    get links() {
        return [
            <Link
                key="min"
                className={styles['LinkControlSet--MIN']}
                to="/mountain-information-network/submit"
            />,
            <Link
                key="mwf"
                className={styles['LinkControlSet--Weather']}
                to="/weather"
            />,
        ]
    }
    renderer = ({ isTouchable }) => {
        if (isTouchable) {
            return <Fragment>{this.links}</Fragment>
        }

        const { tooltips } = this

        return (
            <Fragment>
                {this.links.map((link, index) => (
                    <Wrapper
                        key={index}
                        tooltip={tooltips[index]}
                        placement="right">
                        {link}
                    </Wrapper>
                ))}
            </Fragment>
        )
    }
    render() {
        return (
            <div className={styles.LinkControlSet}>
                <Device>{this.renderer}</Device>
                {this.props.children}
            </div>
        )
    }
}

class ErrorIndicator extends StaticComponent {
    reload() {
        window.location.reload(true)
    }
    get tooltip() {
        const style = {
            padding: '0.25em',
            maxWidth: 225,
        }

        return (
            <div style={style}>
                An error happened while initializing the map. Therefore, some
                functionnalities might not be available.
                <br />
                <Device>
                    {({ isTouchable }) =>
                        `${isTouchable ? 'Tap' : 'Click'} to reload the map.`
                    }
                </Device>
            </div>
        )
    }
    render() {
        return (
            <Wrapper tooltip={this.tooltip}>
                <button onClick={this.reload} className={styles.Error}>
                    <Warning inverse />
                </button>
            </Wrapper>
        )
    }
}
