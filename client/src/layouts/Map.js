import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {compose, withContext, withState, withProps, withHandlers, branch, renderComponent} from 'recompose'
import {Link} from 'react-router'
import {neverUpdate} from 'compose'
import {Primary, Secondary, Menu, OpenMenu} from 'containers/drawers'
import Map from 'containers/Map'
import UnsupportedMap from 'containers/UnsupportedMap'
import mapbox from 'services/mapbox/map'
import {Add} from 'components/icons'
import {Wrapper} from 'components/tooltip'
import styles from './Map.css'

function Layout({primary, setInitializationError}) {
    return (
        <div styleName='Container'>
            <Map onInitializationError={setInitializationError} />
            <Primary>
                {primary}
            </Primary>
            <Secondary />
            <Menu />
            <OpenMenu />
            <LinkControlSet />
        </div>
    )
}

export default mapbox.supported() ? compose(
    withState('initializationError', 'setInitializationError', false),
    withContext({
        location: PropTypes.object.isRequired,
        routes: PropTypes.array.isRequired,
        params: PropTypes.object.isRequired,
    }, ({location, routes, params}) => ({location, routes, params})),
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
        <div style={TOOLTIP_STYLE}>
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

LinkControlSet = neverUpdate(LinkControlSet)
