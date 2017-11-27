import React, { PureComponent, Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { Map } from 'components/map'
import Container from 'containers/Map'
import UnsupportedMap from './UnsupportedMap'
import { Wrapper } from 'components/tooltip'
import Device from 'components/Device'
import { captureException } from 'services/raven'
import { Warning } from 'components/icons'
import Primary from './Primary'
import Secondary from './Secondary'
import { Menu } from 'containers/drawers'
import ToggleMenu from 'containers/drawers/controls/ToggleMenu'
import { parse } from 'utils/search'
import styles from './Map.css'

export default class Layout extends PureComponent {
    state = {
        hasError: false,
    }
    handleError = error => {
        this.setState({ hasError: true }, () => {
            captureException(error)
        })
    }
    render() {
        if (Map.supported()) {
            return (
                <div className={styles.Layout}>
                    <Container onError={this.handleError} />
                    {/* Orders matter here for the route components */}
                    <Route path="/map*">{secondary}</Route>
                    <Route path="/map/:type/:name">{primary}</Route>
                    <Menu />
                    <ToggleMenu />
                    <LinkControlSet>
                        {this.state.hasError && <ErrorIndicator />}
                    </LinkControlSet>
                </div>
            )
        }

        return <UnsupportedMap />
    }
}

class LinkControlSet extends PureComponent {
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
                {this.props.children}
            </div>
        )
    }
}

class ErrorIndicator extends Component {
    shouldComponentUpdate() {
        return false
    }
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

function primary(props) {
    return <Primary {...props} />
}

function secondary(props) {
    const panel = parse(props.location.search).panel || ''
    const [type, id] = panel.split('/')
    const open = typeof type === 'string' && typeof id === 'string'

    return <Secondary open={open} {...props} type={type} id={id} />
}
