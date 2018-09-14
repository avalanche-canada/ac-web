import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { Sponsor as Component } from 'components/misc'
import { Document } from 'prismic/containers'
import { Loading } from 'components/text'
import SponsorsMetadata from 'contexts/sponsors'
import * as params from 'prismic/params'

export default function SponsorRoutes() {
    return (
        <Switch>
            <SponsorRoute
                path="/map/forecasts/kananaskis"
                name="kananaskis"
                label={null}
            />
            <SponsorRoute path="/map" name="Forecast" label={null} />
            <SponsorRoute path="/mountain-information-network" name="MIN" />
            <SponsorRoute path="/events/:uid" name="EventPage" />
            <SponsorRoute path="/events" name="EventIndex" />
            <SponsorRoute path="/news/:uid" name="NewsPage" />
            <SponsorRoute path="/news" name="NewsIndex" />
            <SponsorRoute path="/blogs/:uid" name="BlogPage" />
            <SponsorRoute path="/blogs" name="BlogIndex" />
            <SponsorRoute path="/forecasts/kananaskis" name="kananaskis" />
            <SponsorRoute path="/forecasts" name="Forecast" />
            <SponsorRoute path="/hot-zone-reports" name="Forecast" />
            <SponsorRoute path="/hot-zones" name="Forecast" />
            <SponsorRoute path="/weather" name="Weather" />
            <SponsorRoute path="/training" name="Training" />
            <SponsorRoute path="/courses" name="Training" />
            <SponsorRoute path="/instructing-ast" name="Training" />
            <SponsorRoute path="/youth" name="Youth" />
            <SponsorRoute path="/gear" name="Gear" />
            <SponsorRoute path="/about" name="About" />
        </Switch>
    )
}

// Utils
SponsorRoute.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
}

function SponsorRoute({ path, ...props }) {
    return <Route path={path} render={() => <Sponsor {...props} />} />
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
