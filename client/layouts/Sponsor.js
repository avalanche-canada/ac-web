import React from 'react'
import { Switch } from 'react-router-dom'
import { SponsorRoute } from '~/router/common'

export default function Sponsor() {
    return (
        <Switch>
            <SponsorRoute
                path="/map/forecasts/kananaskis"
                name="kananaskis"
                label={null}
            />
            <SponsorRoute
                path="/map/forecasts/:name"
                name="Forecast"
                label={null}
            />
            <SponsorRoute
                path="/map/hot-zone-reports/:name"
                name="Forecast"
                label={null}
            />
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
            <SponsorRoute path="/weather" name="Weather" />
            <SponsorRoute path="/training" name="Training" />
            <SponsorRoute path="/courses" name="TrainingCourses" />
            <SponsorRoute path="/instructing-ast" name="Training" />
            <SponsorRoute path="/youth" name="Youth" />
            <SponsorRoute path="/gear" name="Gear" />
            <SponsorRoute path="/about" name="About" />
        </Switch>
    )
}
