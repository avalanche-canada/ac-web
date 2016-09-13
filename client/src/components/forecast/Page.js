import React, {PropTypes} from 'react'
import Metadata from './Metadata'
import Forecast from './Forecast'
import {Article, Header} from 'components/page'

Page.propTypes = {
    title: PropTypes.string,
    dateIssued: PropTypes.instanceOf(Date),
    validUntil: PropTypes.instanceOf(Date),
    forecaster: PropTypes.string,
    highlights: PropTypes.string,
    avalancheSummary: PropTypes.string,
    snowpackSummary: PropTypes.string,
    weatherForecast: PropTypes.string,
    problems: PropTypes.array,
    dangerMode: PropTypes.string,
    dangerRatings: PropTypes.array,
    confidence: PropTypes.shape({
        level: PropTypes.string,
        comment: PropTypes.string,
    }),
}

export default function Page({title, dateIssued, validUntil, ...forecast}) {
    return (
        <Article>
            <Header>
                <h1>{title}</h1>
                <Metadata {...{dateIssued, validUntil}} />
            </Header>
            <Forecast {...forecast} />
        </Article>
    )
}
