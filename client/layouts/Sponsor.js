import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import { Sponsor } from 'components/misc'
import { Document } from 'prismic/containers'
import { Loading } from 'components/text'
import SponsorsContext from 'contexts/sponsors'
import * as params from 'prismic/params'

export default function SponsorRoutes() {
    return (
        <Router basepath="/" primary={false}>
            <SponsorRoute
                path="map/forecasts/kananaskis"
                name="kananaskis"
                label={null}
            />
            <SponsorRoute path="map/*" name="Forecast" label={null} />
            <SponsorRoute path="mountain-information-network/*" name="MIN" />
            <SponsorRoute path="events/*" name="EventPage" />
            <SponsorRoute path="events" name="EventIndex" />
            <SponsorRoute path="news/*" name="NewsPage" />
            <SponsorRoute path="news" name="NewsIndex" />
            <SponsorRoute path="blogs/*" name="BlogPage" />
            <SponsorRoute path="blogs" name="BlogIndex" />
            <SponsorRoute path="forecasts/kananaskis" name="kananaskis" />
            <SponsorRoute path="forecasts/*" name="Forecast" />
            <SponsorRoute path="advisories/*" name="Forecast" />
            <SponsorRoute path="weather/*" name="Weather" />
            <SponsorRoute path="training/*" name="Training" />
            <SponsorRoute path="instructing-ast" name="Training" />
            <SponsorRoute path="youth" name="Youth" />
            <SponsorRoute path="gear" name="Gear" />
            <SponsorRoute path="about" name="About" />
        </Router>
    )
}

// Utils
class SponsorRoute extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
    }
    static contextType = SponsorsContext
    shouldComponentUpdate({ name }) {
        return name !== this.props.name
    }
    renderComponent = ({ loading, document = {} }) => {
        const { name, image229, url } = document.data || {}

        return (
            <Sponsor
                label={this.props.label}
                name={name}
                logo={image229}
                url={url}>
                <Loading show={loading} />
            </Sponsor>
        )
    }
    withSponsors = metadata => {}
    render() {
        const { name } = this.props
        const uid = this.context[name] || name
        const props = params.sponsor(uid)

        return <Document {...props}>{this.renderComponent}</Document>
    }
}
