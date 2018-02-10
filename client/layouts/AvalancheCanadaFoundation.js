import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import Application from 'components/application'
import SPAW from './SPAW'
import Footer from 'components/footer'
import { NotFound } from 'components/page'
import { StaticPageRoute } from 'router/common'
import Navbar from 'components/navbar'
import logo from 'styles/AvalancheCanadaFoundation.svg'
import menu from 'constants/menus/foundation'

AvalancheCanadaFoundation.propTypes = {
    match: PropTypes.object.isRequired,
}

// TODO: Could have an AvCan Foundation not found page, not just a regular one

export default function AvalancheCanadaFoundation({ match }) {
    const { url } = match

    return (
        <Application>
            <Navbar logo={logo} menu={menu} donate="/foundation/donate" />
            <Route component={SPAW} />
            <Switch>
                <StaticPageRoute exact path={url} uid="foundation-home" />
                <StaticPageRoute
                    path={`${url}/about`}
                    uid="foundation-about"
                    title="About"
                />
                <StaticPageRoute
                    path={`${url}/programs`}
                    uid="foundation-programs"
                    title="Programs"
                />
                <StaticPageRoute
                    path={`${url}/donors`}
                    uid="foundation-donors"
                    title="Donors"
                />
                <StaticPageRoute
                    path={`${url}/event-sponsors`}
                    uid="foundation-event-sponsors"
                    title="Event Sponsors"
                />
                <StaticPageRoute
                    path={`${url}/news-and-events`}
                    uid="foundation-news-and-events"
                />
                <StaticPageRoute
                    path={`${url}/donate`}
                    uid="foundation-donate"
                    title="Donate to Public Avalanche Safety"
                />
                <StaticPageRoute
                    path={`${url}/funds/hugh-and-helen-hincks-memorial`}
                    uid="hugh-and-helen-hincks-memorial-fund"
                    title="Hugh & Helen Hincks Memorial Fund"
                />
                <StaticPageRoute
                    path={`${url}/funds/craig-kelly-memorial-scholarship`}
                    uid="craig-kelly-memorial-scholarship-fund"
                    title="Craig Kelly Memorial Scholarship Fund"
                />
                <StaticPageRoute
                    path={`${url}/funds/cora-shea-memorial`}
                    uid="cora-shea-memorial-fund"
                    title="Cora Shea Memorial Fund"
                />
                <StaticPageRoute
                    path={`${url}/funds/al-hodgson-memorial`}
                    uid="al-hodgson-memorial-fund"
                    title="Al Hodgson Memorial Fund"
                />
                <StaticPageRoute
                    path={`${url}/funds/issw`}
                    uid="issw-fund"
                    title="ISSW Fund"
                />
                <Route component={NotFound} />
            </Switch>
            <Switch>
                <Route exact path={url} component={null} />
                <Route component={Footer} />
            </Switch>
        </Application>
    )
}
