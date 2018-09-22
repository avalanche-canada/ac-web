import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import { Sponsor as Component } from 'components/misc'
import { Document } from 'prismic/containers'
import { Loading } from 'components/text'
import SponsorsMetadata from 'contexts/sponsors'
import * as params from 'prismic/params'

export default function SponsorRoutes() {
    return (
        <Router>
            <Sponsor
                path="map/forecasts/kananaskis"
                name="kananaskis"
                label={null}
            />
            <Sponsor path="map" name="Forecast" label={null} />
            <Sponsor path="mountain-information-network" name="MIN" />
            <Sponsor path="events/:uid" name="EventPage" />
            <Sponsor path="events" name="EventIndex" />
            <Sponsor path="news/:uid" name="NewsPage" />
            <Sponsor path="news" name="NewsIndex" />
            <Sponsor path="blogs/:uid" name="BlogPage" />
            <Sponsor path="blogs" name="BlogIndex" />
            <Sponsor path="forecasts/kananaskis" name="kananaskis" />
            <Sponsor path="forecasts" name="Forecast" />
            <Sponsor path="hot-zone-reports" name="Forecast" />
            <Sponsor path="hot-zones" name="Forecast" />
            <Sponsor path="weather" name="Weather" />
            <Sponsor path="training" name="Training" />
            <Sponsor path="courses" name="Training" />
            <Sponsor path="instructing-ast" name="Training" />
            <Sponsor path="youth" name="Youth" />
            <Sponsor path="gear" name="Gear" />
            <Sponsor path="about" name="About" />
        </Router>
    )
}

// Utils
Sponsor.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
}

class Sponsor extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
    }
    renderChildren = ({ loading, document = {} }) => {
        const { name, image229, url } = document.data || {}

        return (
            <Component
                label={this.props.label}
                name={name}
                logo={image229}
                url={url}>
                <Loading show={loading} />
            </Component>
        )
    }
    withMetadata = metadata => {
        const { name } = this.props
        const uid = metadata[name] || name

        return (
            <Document {...params.sponsor(uid)}>{this.renderChildren}</Document>
        )
    }
    render() {
        return <SponsorsMetadata>{this.withMetadata}</SponsorsMetadata>
    }
}
