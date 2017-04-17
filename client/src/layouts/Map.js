import React, {createElement} from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {compose, withState, branch, renderComponent, withHandlers, withProps} from 'recompose'
import {Link} from 'react-router'
import {neverUpdate} from '~/compose'
import {Primary, Secondary, Menu, ToggleMenu} from '~/containers/drawers'
import Container from '~/containers/Map'
import UnsupportedMap from '~/containers/UnsupportedMap'
import mapbox from '~/services/mapbox/map'
import {Wrapper} from '~/components/tooltip'
import styles from './Map.css'
import {push} from '~/utils/router'
import MountainInformationNetwork from '~/containers/drawers/content/MountainInformationNetwork'
import WeatherStation from '~/containers/drawers/content/WeatherStation'
import ToyotaTruckReport from '~/containers/drawers/content/ToyotaTruckReport'
import SpecialInformation from '~/containers/drawers/content/SpecialInformation'
import FatalAccident from '~/containers/drawers/content/FatalAccident'
import * as Schemas from '~/api/schemas'
import Controls from '~/containers/drawers/controls/Map'

const ContentComponents = new Map([
    [Schemas.MountainInformationNetworkSubmission.key, MountainInformationNetwork],
    ['weather-stations', WeatherStation],
    ['toyota-truck-reports', ToyotaTruckReport],
    ['special-information', SpecialInformation],
    ['fatal-accident', FatalAccident],
])

export default mapbox.supported() ? compose(
    withState('initializationError', 'setInitializationError', false),
    withHandlers({
        onPrimaryDrawerCloseClick: props => () => {
            push({
                pathname: '/map'
            }, props)
        },
        onSecondaryDrawerCloseClick: props => () => {
            const {query} = props.location

            delete query.panel

            push({query}, props)
        },
    }),
    withProps(props => {
        const {panel} = props.location.query
        let secondary = null

        if (panel) {
            const [type, id] = panel.split('/')
            const Content = ContentComponents.get(type)

            secondary = createElement(Content, {
                key: id,
                id
            })
        }

        return {
            secondary
        }
    }),
    branch(
        props => props.initializationError,
        renderComponent(UnsupportedMap),
    ),
    CSSModules(styles),
)(Layout) : UnsupportedMap

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
        <div style={{...TOOLTIP_STYLE, maxWidth: 125}}>
            Visit the Mountain Weather Forecast
        </div>
    )

    return (
        <div className={styles.LinkControlSet}>
            <Wrapper tooltip={min} placement='right'>
                <Link
                    className={styles['LinkControlSet--MIN']}
                    to='/mountain-information-network/submit' />
            </Wrapper>
            <Wrapper tooltip={weather} placement='right'>
                <Link
                    className={styles['LinkControlSet--Weather']}
                    to='/weather' />
            </Wrapper>
        </div>
    )
}

const OptimizedLinkControlSet = neverUpdate(LinkControlSet)

Layout.propTypes = {
    primary: PropTypes.element.isRequired,
    secondary: PropTypes.element.isRequired,
    setInitializationError: PropTypes.func.isRequired,
    onPrimaryDrawerCloseClick: PropTypes.func.isRequired,
    onSecondaryDrawerCloseClick: PropTypes.func.isRequired,
}

function Layout({
    primary,
    secondary,
    setInitializationError,
    onPrimaryDrawerCloseClick,
    onSecondaryDrawerCloseClick
}) {
    return (
        <div styleName='Container'>
            <Container onInitializationError={setInitializationError} />
            <Primary onCloseClick={onPrimaryDrawerCloseClick} >
                <Controls />
                {primary}
            </Primary>
            <Secondary onCloseClick={onSecondaryDrawerCloseClick}>
                {secondary}
            </Secondary>
            <Menu />
            <ToggleMenu />
            <OptimizedLinkControlSet />
        </div>
    )
}
