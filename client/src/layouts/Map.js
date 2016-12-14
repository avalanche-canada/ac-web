import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {compose, withContext, withState, withProps, withHandlers, branch, renderComponent} from 'recompose'
import {Link} from 'react-router'
import {Primary, Secondary, Menu, OpenMenu} from 'containers/drawers'
import Map from 'containers/Map'
import UnsupportedMap from 'containers/UnsupportedMap'
import styles from './Map.css'
import mapbox from 'services/mapbox/map'
import {Add} from 'components/icons'
import {Wrapper} from 'components/tooltip'


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
            <AddControl />
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


function AddControl({router}) {
    function handleClick(event) {
        router.push('/mountain-information-network/submit')
    }
    const TOOLTIP_STYLE = {
        maxWidth: 175,
        padding: '0.25em',
    }
    const tooltip = (
        <div style={TOOLTIP_STYLE}>
            Create a Mountain Information Network (MIN) report
        </div>
    )

    return (
        <div className={styles.AddControl}>
            <Wrapper tooltip={tooltip} placement='right'>
                <Link
                    className={styles['AddControl--MIN']}
                    to='/mountain-information-network/submit' />
            </Wrapper>
        </div>
    )
}
