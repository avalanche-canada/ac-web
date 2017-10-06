import React from 'react'
import PropTypes from 'prop-types'
import GramSet, { Location } from './gram'
import ExceedenceProbability from './ExceedenceProbability'
import BasePanel, { INVERSE } from '~/components/panel'
import { carte, epsgram, spaghetti } from '~/services/msc/naefs'
import Loop from '~/components/loop'

const PANEL_PADDING = {
    padding: '2em 1em',
}

function Panel({ children, ...props }) {
    return (
        <BasePanel expandable theme={INVERSE} {...props}>
            {children}
        </BasePanel>
    )
}

ExtendedWeatherForecast.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

const SEQUENCE = [4, 5, 6, 7, 8, 9]
const LOOP_TITLES = SEQUENCE.map(value => `Day ${value + 1}`)

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
            <Panel header="500 hPa Mean / Standard Deviation Chart">
                <div style={PANEL_PADDING}>
                    <Loop
                        openImageInNewTab
                        urls={hpaUrls}
                        titles={LOOP_TITLES}
                    />
                </div>
            </Panel>
            <Panel header="1000 – 500 hPa Thickness Chart">
                <div style={PANEL_PADDING}>
                    <Loop
                        openImageInNewTab
                        urls={thicknessUrls}
                        titles={LOOP_TITLES}
                    />
                </div>
            </Panel>
            <Panel header="EPSgrams">
                <div style={PANEL_PADDING}>
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
                </div>
            </Panel>
            <Panel header="Exceedence Probability">
                <ExceedenceProbability date={date} />
            </Panel>
            <Panel header="546 dam – 500 hPa Contour Line (Canadian Ensemble)">
                <div style={PANEL_PADDING}>
                    <Loop
                        openImageInNewTab
                        urls={spaghettiUrls}
                        titles={LOOP_TITLES}
                    />
                </div>
            </Panel>
        </section>
    )
}
