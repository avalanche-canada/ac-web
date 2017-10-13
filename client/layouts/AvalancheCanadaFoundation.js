import React from 'react'
import PropTypes from 'prop-types'
import Application from '~/components/application'
import { AvalancheCanadaFoundation as Navbar } from '~/containers/Navbar'
import Highlight from '~/containers/Highlight'
import Footer from '~/components/footer'
import { Route, Switch } from 'react-router-dom'
import { StaticPage } from '~/prismic/containers'
import { NotFound } from '~/components/page'
import { createRoute } from '~/utils/router'

function createRoutes(root) {
    return [
        {
            path: root,
            exact: true,
            render() {
                return <StaticPage uid="foundation-home" />
            },
        },
        {
            path: `${root}/about`,
            render() {
                return <StaticPage uid="foundation-about" title="About" />
            },
        },
        {
            path: `${root}/programs`,
            render() {
                return <StaticPage uid="foundation-programs" title="Programs" />
            },
        },
        {
            path: `${root}/donors`,
            render() {
                return <StaticPage uid="foundation-donors" title="Donors" />
            },
        },
        {
            path: `${root}/event-sponsors`,
            render() {
                return (
                    <StaticPage
                        uid="foundation-event-sponsors"
                        title="Event Sponsors"
                    />
                )
            },
        },
        {
            path: `${root}/news-and-events`,
            render() {
                return <StaticPage uid="foundation-news-and-events" />
            },
        },
        {
            path: `${root}/donate`,
            render() {
                return (
                    <StaticPage
                        uid="foundation-donate"
                        title="Donate to Public Avalanche Safety"
                    />
                )
            },
        },
        {
            path: `${root}/funds/hugh-and-helen-hincks-memorial`,
            render() {
                return (
                    <StaticPage
                        uid="hugh-and-helen-hincks-memorial-fund"
                        title="Hugh & Helen Hincks Memorial Fund"
                    />
                )
            },
        },
        {
            path: `${root}/funds/craig-kelly-memorial-scholarship`,
            render() {
                return (
                    <StaticPage
                        uid="craig-kelly-memorial-scholarship-fund"
                        title="Craig Kelly Memorial Scholarship Fund"
                    />
                )
            },
        },
        {
            path: `${root}/funds/cora-shea-memorial`,
            render() {
                return (
                    <StaticPage
                        uid="cora-shea-memorial-fund"
                        title="Cora Shea Memorial Fund"
                    />
                )
            },
        },
        {
            path: `${root}/funds/al-hodgson-memorial`,
            render() {
                return (
                    <StaticPage
                        uid="al-hodgson-memorial-fund"
                        title="Al Hodgson Memorial Fund"
                    />
                )
            },
        },
        {
            path: `${root}/funds/issw`,
            render() {
                return <StaticPage uid="issw-fund" title="ISSW Fund" />
            },
        },
    ]
}

AvalancheCanadaFoundation.propTypes = {
    match: PropTypes.object.isRequired,
}

// TODO: Could have an AvCan Foundation not found page, not just a regular one

export default function AvalancheCanadaFoundation({ match }) {
    const { url } = match

    return (
        <Application>
            <Navbar />
            <Highlight />
            <Switch>
                {createRoutes(url).map(createRoute)}
                <Route component={NotFound} />
            </Switch>
            <Switch>
                <Route exact path={url} component={null} />
                <Route component={Footer} />
            </Switch>
        </Application>
    )
}
