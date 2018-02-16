import React, { Fragment } from 'react'
import StaticComponent from 'components/StaticComponent'
import UnsupportedMap from 'layouts/UnsupportedMap'

export default class Unsupported extends StaticComponent {
    render() {
        const links = new Map([
            ['/trip-planning', 'Trip planning'],
            ['/forecasts', 'Forecast regions'],
            ['/weather', 'Mountain Weather Forecast'],
        ])
        const headline = (
            <Fragment>
                It seems that your browser does not support the technology
                required (WebGL for the geeks) to run the Trip Planner. Stay
                tuned, we are working on making a version for users that do not
                have the required technology.
            </Fragment>
        )

        return <UnsupportedMap links={links} headline={headline} />
    }
}
