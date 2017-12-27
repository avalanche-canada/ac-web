import React, { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import Headline from './Headline'
import Footer from './Footer'
import ArchiveWarning from './ArchiveWarning'
import TabSet from './TabSet'
import Metadata from './Metadata'

export default class Forecast extends PureComponent {
    static propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
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
        isArchived: PropTypes.bool.isRequired,
        region: PropTypes.string.isRequired,
    }
    render() {
        const { isArchived, highlights, region, date, ...props } = this.props

        return (
            <section>
                {isArchived && <ArchiveWarning region={region} date={date} />}
                <Headline>{highlights}</Headline>
                <TabSet {...props} />
                <Footer region={region} />
            </section>
        )
    }
}

export class Compound extends PureComponent {
    static propTypes = {
        forecast: PropTypes.object,
        children: PropTypes.node,
    }
    renderChild = child => {
        if (!child) {
            return null
        }

        const { forecast } = this.props

        switch (child.type) {
            case ArchiveWarning:
                return forecast && forecast.get('isArchived')
                    ? cloneElement(child, {
                          region: forecast.get('region'),
                          date: forecast.get('date'),
                      })
                    : null
            case Headline:
                return forecast
                    ? cloneElement(child, null, forecast.get('highlights'))
                    : null
            case Metadata:
                return forecast
                    ? cloneElement(child, {
                          dateIssued: forecast.get('dateIssued'),
                          validUntil: forecast.get('validUntil'),
                          forecaster: forecast.get('forecaster'),
                      })
                    : null
            case TabSet:
                return forecast
                    ? cloneElement(child, {
                          avalancheSummary: forecast.get('avalancheSummary'),
                          snowpackSummary: forecast.get('snowpackSummary'),
                          weatherForecast: forecast.get('weatherForecast'),
                          problems: forecast.get('problems').toJS(),
                          dangerMode: forecast.get('dangerMode'),
                          dangerRatings: forecast.get('dangerRatings').toJS(),
                          confidence: forecast.get('confidence').toObject(),
                      })
                    : null
            case Footer:
                return forecast
                    ? cloneElement(child, {
                          region: forecast.get('region'),
                          date: forecast.get('date'),
                      })
                    : null
            default:
                return child
        }
    }
    get children() {
        return (
            this.props.children || [
                <Metadata />,
                <ArchiveWarning />,
                <Headline />,
                <TabSet />,
                <Footer />,
            ]
        )
    }
    render() {
        return (
            <section>{Children.map(this.children, this.renderChild)}</section>
        )
    }
}
