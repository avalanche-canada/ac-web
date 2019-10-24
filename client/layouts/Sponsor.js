import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import { Sponsor } from 'components/misc'
import { Loading } from 'components/text'
import { useSponsor } from 'contexts/sponsors'
import * as params from 'prismic/params'
import { useDocument } from 'prismic/hooks'

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
SponsorRoute.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
}
function SponsorRoute({ name, label }) {
    const uid = useSponsor(name)
    const [document, pending] = useDocument(params.sponsor(uid))

    return (
        <Sponsor
            label={label}
            name={document?.data?.name}
            logo={document?.data?.['image-229']}
            url={document?.data?.url}>
            {pending && <Loading />}
        </Sponsor>
    )
}
