import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import GramSet, { Location } from './gram'
import ExceedanceProbability from './ExceedanceProbability'
import { carte, epsgram, spaghetti } from 'services/msc/naefs'
import { OpenInNewTab } from 'components/misc'
import Loop from 'components/loop'
import { FormattedMessage, useIntl } from 'react-intl'

ExtendedWeatherForecast.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function ExtendedWeatherForecast({ date }) {
    const loopTitles = useLoopTitles()
    const hpaUrls = SEQUENCE.map(factor =>
        carte({
            product: 'GZ500',
            date,
            hour: factor * 24,
        })
    )
    const thicknessUrls = SEQUENCE.map(factor =>
        carte({
            product: 'DZ500',
            date,
            hour: factor * 24,
        })
    )
    const spaghettiUrls = SEQUENCE.map(factor =>
        spaghetti({
            date,
            hour: factor * 24,
        })
    )

    return (
        <Fragment>
            <Section
                header={
                    <FormattedMessage
                        description="Component weather/ExtendedWeatherForecast"
                        defaultMessage="500 hPa Mean / Standard Deviation (N. American Ensemble)"
                    />
                }>
                <Loop urls={hpaUrls} titles={loopTitles} />
            </Section>
            <Section
                header={
                    <FormattedMessage
                        description="Component weather/ExtendedWeatherForecast"
                        defaultMessage="1000 – 500 hPa Thickness (N. American Ensemble)"
                    />
                }>
                <Loop urls={thicknessUrls} titles={loopTitles} />
            </Section>
            <Section
                header={
                    <FormattedMessage
                        description="Component weather/ExtendedWeatherForecast"
                        defaultMessage="EPSgrams (N. American Ensemble)"
                    />
                }>
                <GramSet>
                    <Location>
                        <header>Terrace</header>
                        <OpenInNewTab>
                            <img src={epsgram({ code: 'yxt', date })} />
                        </OpenInNewTab>
                    </Location>
                    <Location>
                        <header>Prince George</header>
                        <OpenInNewTab>
                            <img src={epsgram({ code: 'yxs', date })} />
                        </OpenInNewTab>
                    </Location>
                    <Location>
                        <header>Vancouver</header>
                        <OpenInNewTab>
                            <img src={epsgram({ code: 'yvr', date })} />
                        </OpenInNewTab>
                    </Location>
                    <Location>
                        <header>Revelstoke</header>
                        <OpenInNewTab>
                            <img src={epsgram({ code: 'yrv', date })} />
                        </OpenInNewTab>
                    </Location>
                </GramSet>
            </Section>

            <Section
                header={
                    <FormattedMessage
                        description="Component weather/ExtendedWeatherForecast"
                        defaultMessage="Exceedance Probability (N. American Ensemble)"
                    />
                }>
                <ExceedanceProbability date={date} />
            </Section>
            <Section
                header={
                    <FormattedMessage
                        description="Component weather/ExtendedWeatherForecast"
                        defaultMessage="546 dam – 500 hPa Contour Line (Canadian Ensemble)"
                    />
                }>
                <Loop urls={spaghettiUrls} titles={loopTitles} />
            </Section>
        </Fragment>
    )
}

// Utils
function Section({ children, header }) {
    return (
        <section>
            <h4>{header}</h4>
            {children}
        </section>
    )
}
function useLoopTitles() {
    const intl = useIntl()

    return useMemo(
        () =>
            SEQUENCE.map(value =>
                intl.formatMessage(
                    {
                        description:
                            'Component weather/ExtendedWeatherForecast',
                        defaultMessage: 'Day {value}',
                    },
                    { value }
                )
            ),
        [intl.locale]
    )
}

// Constants
const SEQUENCE = [5, 6, 7, 8, 9, 10]
