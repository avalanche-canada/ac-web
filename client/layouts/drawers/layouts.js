import React from 'react'
import PropTypes from 'prop-types'
import { Link, Router } from '@reach/router'
import * as Components from 'components/page/drawer'
import Sponsor from 'layouts/Sponsor'
// import SPAW from './SPAW'

export default Components.Container

Navbar.propTypes = {
    onCloseClick: PropTypes.func.isRequired,
}

export function Navbar({ onCloseClick }) {
    return (
        <Components.Navbar>
            <Router primary={false}>
                {/* <SPAW path="/map/forecasts/:name" /> */}
            </Router>
            <Sponsor label={null} />
            <Components.Close onClick={onCloseClick} />
        </Components.Navbar>
    )
}

Header.propTypes = {
    subject: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export function Header({ subject, link, title, onLocateClick }) {
    return (
        <Components.Header subject={subject}>
            <h1>
                <Link to={link}>{title || 'Loading...'}</Link>
                {typeof onLocateClick === 'function' && (
                    <Components.DisplayOnMap onClick={onLocateClick} />
                )}
            </h1>
        </Components.Header>
    )
}

export const { Body } = Components
