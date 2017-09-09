import React from 'react'
import PropTypes from 'prop-types'
import { DateElement } from '~/components/time'
import addDays from 'date-fns/add_days'
import GramSet, { Location } from './gram'
import Caroussel from './Carousel'
import ExceedenceProbability from './ExceedenceProbability'
import { StructuredText } from '~/prismic/components/base'
import Fetch from '~/prismic/components/Fetch'
import { Loading } from '~/components/text'
import BasePanel, { INVERSE } from '~/components/panel'
import * as Predicates from '~/vendor/prismic/predicates'
import setDay from 'date-fns/set_day'
import formatDate from 'date-fns/format'
import { parse } from '~/prismic'
import { Metadata as BaseMetadata, Entry } from '~/components/metadata'
import { carte, epsgram } from '~/services/msc/naefs'

function Metadata({ date, issued, name }) {
    const day5 = addDays(date, 4)
    const day10 = addDays(date, 9)

    return (
        <BaseMetadata>
            <Entry term="Issued">
                <DateElement value={date} /> at {issued} PST/PDT
            </Entry>
            <Entry term="Created by">{name}</Entry>
            <Entry term="Valid from">
                <DateElement value={day5} />
            </Entry>
            <Entry term="Valid to">
                <DateElement value={day10} />
            </Entry>
        </BaseMetadata>
    )
}

function Panel({ children, ...props }) {
    return (
        <BasePanel expandable theme={INVERSE} {...props}>
            <div style={{ padding: '2em 1em' }}>{children}</div>
        </BasePanel>
    )
}

ExtendedWeatherForecast.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function ExtendedWeatherForecast({ date }) {
    const predicates = [
        Predicates.type('extended-weather-forecast'),
        Predicates.at(
            'my.extended-weather-forecast.date',
            formatDate(setDay(date, 1), 'YYYY-MM-DD')
        ),
    ]
    const hpa = [4, 5, 6, 7, 8, 9].map(factor =>
        carte({
            product: 'GZ500',
            date,
            hour: factor * 24,
        })
    )
    const thickness = [4, 5, 6, 7, 8, 9].map(factor =>
        carte({
            product: 'DZ500',
            date,
            hour: factor * 24,
        })
    )

    return (
        <section>
            <Fetch predicates={predicates}>
                {({ isLoading, data }) => {
                    if (isLoading || !data) {
                        return (
                            <Loading>
                                Loading extended weather forecast synopsis...
                            </Loading>
                        )
                    }

                    const { content, headline, ...metadata } = parse(
                        data.results[0]
                    ).data

                    return (
                        <section>
                            <h3>{headline}</h3>
                            <Metadata {...metadata} />
                            <StructuredText value={content} />
                        </section>
                    )
                }}
            </Fetch>
            <Panel header="500hPa Mean / Standard Deviation Chart">
                <Caroussel images={hpa} />
            </Panel>
            <Panel header="Thickness 100 – 500 Chart">
                <Caroussel images={thickness} />
            </Panel>
            <Panel header="EPSgrams">
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
            </Panel>
            <BasePanel
                expandable
                theme={INVERSE}
                header="Exceedence Probability">
                <ExceedenceProbability date={date} />
            </BasePanel>
        </section>
    )
}
