import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import GramSet, { Location } from './gram'
import ExceedanceProbability from './ExceedanceProbability'
import { carte, epsgram, spaghetti } from 'services/msc/naefs'
import Loop from 'components/loop'

ExtendedWeatherForecast.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function ExtendedWeatherForecast({ date }) {
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
            <Section header="500 hPa Mean / Standard Deviation (N. American Ensemble)">
                <Loop urls={hpaUrls} titles={LOOP_ITLES} />
            </Section>
            <Section header="1000 – 500 hPa Thickness (N. American Ensemble)">
                <Loop urls={thicknessUrls} titles={LOOP_ITLES} />
            </Section>
            <Section header="EPSgrams (N. American Ensemble)">
                <GramSet>
                    <Location>
                        <header>Terrace</header>
                        <img src={epsgram({ code: 'yxt', date })} />
                    </Location>
                    <Location>
                        <header>Prince George</header>
                        <img src={epsgram({ code: 'yxs', date })} />
                    </Location>
                    <Location>
                        <header>Vancouver</header>
                        <img src={epsgram({ code: 'yvr', date })} />
                    </Location>
                    <Location>
                        <header>Revelstoke</header>
                        <img src={epsgram({ code: 'yrv', date })} />
                    </Location>
                </GramSet>
            </Section>
            <Section header="Exceedance Probability (N. American Ensemble)">
                <ExceedanceProbability date={date} />
            </Section>
            <Section header="546 dam – 500 hPa Contour Line (Canadian Ensemble)">
                <Loop urls={spaghettiUrls} titles={LOOP_ITLES} />
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

// Constants
const SEQUENCE = [5, 6, 7, 8, 9, 10]
const LOOP_ITLES = SEQUENCE.map(value => `Day ${value}`)
