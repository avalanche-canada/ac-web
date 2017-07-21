import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { compose, withState, branch, renderComponent } from 'recompose'
import { Link, Route, Switch } from 'react-router-dom'
import { neverUpdate } from '~/compose'
import Url from 'url'
import Map from '~/containers/Map'
import UnsupportedMap from '~/containers/UnsupportedMap'
import mapbox from '~/services/mapbox/map'
import { Wrapper } from '~/components/tooltip'
import styles from './Map.css'
import Primary from './Primary'
import Secondary from './Secondary'
import Menu from '~/containers/drawers/content/Menu'
import ToggleMenu from '~/containers/drawers/controls/ToggleMenu'
import externals from '~/router/externals'

function primary(props) {
    const { match } = props
    let open = false

    if (match) {
        const { type, name } = match.params

        open = true

        if (type === 'forecasts' && externals.has(name)) {
            window.open(externals.get(name), '_blank')
            open = false
        }
    }

    return <Primary open={open} {...props} />
}

function secondary(props) {
    const panel = Url.parse(props.location.search, true).query.panel || ''
    const [type, id] = panel.split('/')
    const open = type && id

    return <Secondary open={open} {...props} type={type} id={id} />
}

Layout.propTypes = {
    onInitializationError: PropTypes.func.isRequired,
}

function Layout({ onInitializationError }) {
    return (
        <div styleName="Layout">
            <Map onInitializationError={onInitializationError} />
            <Switch>
                <Route path="/map/:type/:name" children={primary} />
                <Route path="/map*" children={secondary} />
            </Switch>
            <Menu />
            <ToggleMenu />
            <OptimizedLinkControlSet />
        </div>
    )
}

const Supported = compose(
    withState('initializationError', 'onInitializationError', false),
    branch(props => props.initializationError, renderComponent(UnsupportedMap)),
    CSSModules(styles)
)(Layout)

export default (mapbox.supported() ? Supported : UnsupportedMap)

function LinkControlSet() {
    const TOOLTIP_STYLE = {
        maxWidth: 175,
        padding: '0.25em',
    }
    const min = (
        <div style={TOOLTIP_STYLE}>
            Create a Mountain Information Network (MIN) report
        </div>
    )
    const weather = (
        <div style={{ ...TOOLTIP_STYLE, maxWidth: 125 }}>
            Visit the Mountain Weather Forecast
        </div>
    )

    return (
        <div className={styles.LinkControlSet}>
            <Wrapper tooltip={min} placement="right">
                <Link
                    className={styles['LinkControlSet--MIN']}
                    to="/mountain-information-network/submit"
                />
            </Wrapper>
            <Wrapper tooltip={weather} placement="right">
                <Link
                    className={styles['LinkControlSet--Weather']}
                    to="/weather"
                />
            </Wrapper>
        </div>
    )
}

const OptimizedLinkControlSet = neverUpdate(LinkControlSet)
