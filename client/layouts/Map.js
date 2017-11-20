import React, { PureComponent, Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { parse } from 'utils/search'
import Map from 'containers/Map'
import UnsupportedMap from './UnsupportedMap'
import mapbox from 'services/mapbox/map'
import { Wrapper } from 'components/tooltip'
import Device from 'components/Device'
import ErrorBoundary from 'components/ErrorBoundary'
import Primary from './Primary'
import Secondary from './Secondary'
import { Menu } from 'containers/drawers'
import ToggleMenu from 'containers/drawers/controls/ToggleMenu'
import styles from './Map.css'

export default class Layout extends PureComponent {
    renderer = ({ hasError }) => {
        if (hasError || !mapbox.supported()) {
            return <UnsupportedMap />
        }

        return (
            <div className={styles.Layout}>
                <Map />
                {/* Orders matter here for the route components */}
                <Route path="/map*">{secondary}</Route>
                <Route path="/map/:type/:name">{primary}</Route>
                <Menu />
                <ToggleMenu />
                <LinkControlSet />
            </div>
        )
    }
    render() {
        return <ErrorBoundary>{this.renderer}</ErrorBoundary>
    }
}

class LinkControlSet extends Component {
    shouldComponentUpdate() {
        return false
    }
    get tooltips() {
        const style = {
            maxWidth: 175,
            padding: '0.25em',
        }

        return [
            <div style={style}>
                Create a Mountain Information Network (MIN) report
            </div>,
            <div style={{ ...style, maxWidth: 125 }}>
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
                key="weather"
                className={styles['LinkControlSet--Weather']}
                to="/weather"
            />,
        ]
    }
    renderer = ({ isTouchable }) => {
        if (isTouchable) {
            return this.links
        }

        const { tooltips } = this

        return this.links.map((link, index) => (
            <Wrapper key={index} tooltip={tooltips[index]} placement="right">
                {link}
            </Wrapper>
        ))
    }
    render() {
        return (
            <div className={styles.LinkControlSet}>
                <Device>{this.renderer}</Device>
            </div>
        )
    }
}

function primary(props) {
    return <Primary {...props} />
}

function secondary(props) {
    const panel = parse(props.location.search).panel || ''
    const [type, id] = panel.split('/')
    const open = typeof type === 'string' && typeof id === 'string'

    return <Secondary open={open} {...props} type={type} id={id} />
}
