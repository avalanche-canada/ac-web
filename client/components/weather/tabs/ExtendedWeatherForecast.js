import React from 'react'
import PropTypes from 'prop-types'
import GramSet, { Location } from './gram'
import ExceedanceProbability from './ExceedanceProbability'
import BasePanel, { INVERSE } from 'components/panel'
import { carte, epsgram, spaghetti } from 'services/msc/naefs'
import Loop from 'components/loop'
import Shim from 'components/Shim'

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
        <section>
            <Panel header="500 hPa Mean / Standard Deviation (N. American Ensemble)">
                <Shim all>
                    <Loop urls={hpaUrls} titles={LOOP_TITLES} />
                </Shim>
            </Panel>
            <Panel header="1000 – 500 hPa Thickness (N. American Ensemble)">
                <Shim all>
                    <Loop urls={thicknessUrls} titles={LOOP_TITLES} />
                </Shim>
            </Panel>
            <Panel header="EPSgrams (N. American Ensemble)">
                <Shim all>
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
                </Shim>
            </Panel>
            <Panel header="Exceedance Probability (N. American Ensemble)">
                <ExceedanceProbability date={date} />
            </Panel>
            <Panel header="546 dam – 500 hPa Contour Line (Canadian Ensemble)">
                <Shim all>
                    <Loop urls={spaghettiUrls} titles={LOOP_TITLES} />
                </Shim>
            </Panel>
        </section>
    )
}

// Utils
function Panel({ children, ...props }) {
    return (
        <BasePanel expandable expanded theme={INVERSE} {...props}>
            {children}
        </BasePanel>
    )
}

// Constants
const SEQUENCE = [5, 6, 7, 8, 9, 10]
const LOOP_TITLES = SEQUENCE.map(value => `Day ${value}`)
