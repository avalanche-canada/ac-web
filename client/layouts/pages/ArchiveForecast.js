import * as React from 'react'
import PropTypes from 'prop-types'
import isToday from 'date-fns/is_today'
import endOfYesterday from 'date-fns/end_of_yesterday'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import { useIntl, FormattedMessage } from 'react-intl'
import { useForecasts } from 'hooks/async/api/products'
import { Content, Header, Main, Section } from 'components/page'
import { Page } from 'layouts/pages'
import * as Components from 'layouts/products/forecast'
import * as Texts from 'components/text'
import { Warning } from 'components/alert'
import { Metadata, Entry } from 'components/metadata'
import { DateElement } from 'components/time'
import Shim from 'components/Shim'
import { DayPicker } from 'components/controls'
import Pager, { Previous, Next } from 'components/pager'
import * as Async from 'contexts/async'
import { DateParam } from 'hooks/params'
import * as urls from 'utils/url'
import { useSections } from 'hooks/product'
import Panel from 'components/panel'

ArchiveForecast.propTypes = {
    date: PropTypes.instanceOf(Date),
    onDateChange: PropTypes.func.isRequired,
}

export default function ArchiveForecast({ date, onDateChange }) {
    const intl = useIntl()
    const placeholder = intl.formatMessage({
        defaultMessage: 'Select a date',
    })
    const title = (
        <FormattedMessage
            description="Layout pages/ArchiveForecast"
            defaultMessage="Forecast Archive"
        />
    )

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Metadata>
                        <Entry>
                            <DayPicker
                                date={date}
                                placeholder={placeholder}
                                onChange={onDateChange}
                                disabledDays={{
                                    after: endOfYesterday(),
                                }}
                            />
                        </Entry>
                    </Metadata>
                    {date ? (
                        <ForecastContent date={date} />
                    ) : (
                        <Texts.Muted>
                            <FormattedMessage
                                description="Layout pages/ArchiveForecast"
                                defaultMessage="Select a forecast date."
                            />
                        </Texts.Muted>
                    )}
                </Main>
            </Content>
        </Page>
    )
}

// Utils
function ForecastContent({ date }) {
    return (
        <Async.Provider value={useForecasts(date)}>
            <Async.Pending>
                <Texts.Loading>
                    <FormattedMessage
                        description="Layout pages/ArchiveForecast"
                        defaultMessage="Loading archived forecasts..."
                    />
                </Texts.Loading>
            </Async.Pending>
            <ForecastList payload={FORECASTS} />
            <Async.Found>
                <ForecastList />
            </Async.Found>
            <Async.HTTPError>
                <DisplayHTTPError />
            </Async.HTTPError>
            <ForecastPager date={date} />
        </Async.Provider>
    )
}
function DisplayHTTPError({ error }) {
    return <Texts.Error>{error.payload.message}</Texts.Error>
}
function ForecastList({ payload }) {
    const sections = useSections(payload)

    return Array.from(sections, ([owner, forecasts]) => (
        <Section key={owner} title={owner}>
            {forecasts.map(forecast => (
                <ForecastLayout key={forecast.id} forecast={forecast} />
            ))}
        </Section>
    ))
}
function ForecastLayout({ forecast }) {
    return (
        <Components.Provider key={forecast.id} value={forecast}>
            <Panel header={forecast.report.title}>
                <Components.Metadata />
                <Shim top>
                    <Warning>
                        <FormattedMessage
                            description="Layout pages/ArchiveForecast"
                            defaultMessage="This is an archived avalanche bulletin."
                        />
                    </Warning>
                </Shim>
                <Components.Headline />
                <Components.TabSet />
            </Panel>
        </Components.Provider>
    )
}

function ForecastPager({ date }) {
    const previous = subDays(date, 1)
    const next = addDays(date, 1)

    return (
        <Pager>
            <Previous to={createLink(previous)}>
                <DateElement value={previous} />
            </Previous>
            {isToday(date) || (
                <Next to={createLink(next)}>
                    <DateElement value={next} />
                </Next>
            )}
        </Pager>
    )
}

function createLink(date) {
    return urls.path('/forecasts/archives', DateParam.format(date))
}

const FORECASTS = [
    {
        id: 'PC-19_2018-12-02T2300_c9eb169e-29ec-4579-a1ea-d4c0f560a7f2',
        slug: 'cariboos',
        url: '',
        type: 'forecast',
        area: { id: 'cariboos', name: 'Cariboos' },
        report: {
            id: 'PC-19_2018-12-02T2300_c9eb169e-29ec-4579-a1ea-d4c0f560a7f2',
            forecaster: 'jsmith',
            dateIssued: '2018-12-02T23:00:00Z',
            validUntil: '2018-12-03T22:00:00Z',
            title: 'Avalanche Bulletin - Cariboos',
            highlights:
                '\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_A8FEC758"\u003eThere is a lot of uncertainty with the reactivity of the buried surface hoar layer down 40-80 cm. Human triggered avalanches are more likely at treeline and sheltered locations in the alpine where this weak layer may exist. New Forecaster blog \u003c/span\u003e\u003ca href="https://www.avalanche.ca/blogs/the-buzz" target="_blank"\u003e\u003cspan class="s_FAD39806"\u003eHERE.\u003c/span\u003e\u003c/a\u003e\u003cspan class="s_AA239A9B" /\u003e\u003c/p\u003e',
            confidence: {
                rating: { value: 'low', display: 'Low' },
                statements: ['Due to the number of field observations'],
            },
            summaries: [
                {
                    type: {
                        value: 'avalanche-summary',
                        display: 'Avalanche Summary',
                    },
                    content:
                        '\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_1681A555"\u003eNo avalanches were reported in this region on Saturday. However, we currently have very few observations from within this region. Please post your observations to the Mountain Information Network. \u003c/span\u003e\u003ca href="https://www.avalanche.ca/mountain-information-network" target="_blank"\u003e\u003cspan class="s_69909980"\u003e(MIN) \u003c/span\u003e\u003c/a\u003e\u003cspan class="s_AA239A9B"\u003e \u003c/span\u003e\u003c/p\u003e',
                },
                {
                    type: {
                        value: 'snowpack-summary',
                        display: 'Snowpack Summary',
                    },
                    content:
                        '\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_1681A555"\u003eThere may be some lingering wind slaps in exposed, alpine terrain, but the primary concern in the snowpack is a weak layer of surface hoar (feathery crystals) and/or sun crust depending on the aspect of the terrain. This layer is down 30-70 cm and has been described as \'spotty\' with regards to its distribution. It is most pronounced at treeline, but may be found in sheltered, north facing alpine areas.\u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_1681A555"\u003eAt the base of the snowpack is a crust that formed in late October. There have been no reports of reactivity on this layer; however, this layer may be reactive to human triggers in isolated locations such as steep, rocky terrain, with a shallow snowpack. Small avalanches may step-down to this crust resulting in large, destructive avalanches\u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_1681A555"\u003eSnowpack depths decrease dramatically with elevation where rocks, stumps, and open creeks remain significant hazards.\u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_1681A555"\u003eWe currently have very limited snowpack observations within this region, so it is critical to supplement this information with your own observations.\u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_1681A555"\u003eCheck out our latest \u003c/span\u003e\u003ca href="https://www.avalanche.ca/blogs/the-buzz" target="_blank"\u003e\u003cspan class="s_69909980"\u003eFORECASTER BLOG\u003c/span\u003e\u003c/a\u003e\u003cspan class="s_1681A555"\u003e for more insight into the uncertainty we have with the surface hoar layer in the southern Cariboos.\u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_1681A555"\u003e \u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_AA239A9B"\u003e \u003c/span\u003e\u003c/p\u003e',
                },
                {
                    type: { value: 'weather-summary', display: 'Weather Summary' },
                    content:
                        '\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_1681A555"\u003eOvernight SUNDAY: Mostly cloudy / Alpine Low -14 / Light, northwest wind / Freezing level valley bottom.\u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_1681A555"\u003eMONDAY: Mix of sun and cloud / Alpine high -10 / Light, northwest wind / Freezing level valley bottom.\u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_1681A555"\u003eTUESDAY: Mix of sun and cloud / Alpine high -12 / Moderate, northwest wind / Freezing valley bottom.\u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_1681A555"\u003eWEDNESDAY: Sunny / Alpine high -12 / Light, northwest wind / Freezing level valley bottom.\u003c/span\u003e\u003c/p\u003e',
                },
            ],
            dangerRatings: [
                {
                    date: { value: '2018-12-03T23:00:00.000Z', display: 'Monday' },
                    ratings: {
                        alp: {
                            display: 'Alpine',
                            rating: { value: 'moderate', display: 'Moderate' },
                        },
                        tln: {
                            display: 'Treeline',
                            rating: { value: 'moderate', display: 'Moderate' },
                        },
                        btl: {
                            display: 'Below Treeline',
                            rating: { value: 'low', display: 'Low' },
                        },
                    },
                },
                {
                    date: { value: '2018-12-04T23:00:00.000Z', display: 'Tuesday' },
                    ratings: {
                        alp: {
                            display: 'Alpine',
                            rating: { value: 'moderate', display: 'Moderate' },
                        },
                        tln: {
                            display: 'Treeline',
                            rating: { value: 'moderate', display: 'Moderate' },
                        },
                        btl: {
                            display: 'Below Treeline',
                            rating: { value: 'low', display: 'Low' },
                        },
                    },
                },
                {
                    date: {
                        value: '2018-12-05T23:00:00.000Z',
                        display: 'Wednesday',
                    },
                    ratings: {
                        alp: {
                            display: 'Alpine',
                            rating: { value: 'moderate', display: 'Moderate' },
                        },
                        tln: {
                            display: 'Treeline',
                            rating: { value: 'moderate', display: 'Moderate' },
                        },
                        btl: {
                            display: 'Below Treeline',
                            rating: { value: 'low', display: 'Low' },
                        },
                    },
                },
            ],
            problems: [
                {
                    type: { value: 'persistent-slab', display: 'Persistent Slabs' },
                    comment:
                        '\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_1681A555"\u003eBe especially cautious with this buried weak layer in the Treeline elevation band, on large open slopes that have a deep enough snowpack to bury all the bushes and make the slope smooth. It may also be present in sheltered, N. facing alpine slopes.\u003c/span\u003e\u003c/p\u003e',
                    factors: [
                        {
                            type: { value: 'elevation', display: 'What Elevation?' },
                            graphic: {
                                id: '-0-1-1',
                                url:
                                    'https://ac-assets.s3-us-west-2.amazonaws.com/images/Elevation/Elevation-0-1-1_EN.png',
                            },
                        },
                        {
                            type: { value: 'aspect', display: 'Which Slopes?' },
                            graphic: {
                                id: '-1-1-1-1-1-1-1-1',
                                url:
                                    'https://ac-assets.s3-us-west-2.amazonaws.com/images/Compass/compass-1-1-1-1-1-1-1-1_EN.png',
                            },
                        },
                        {
                            type: {
                                value: 'likelihood',
                                display: 'Chances of Avalanches?',
                            },
                            graphic: {
                                id: 'possible',
                                url:
                                    'https://ac-assets.s3-us-west-2.amazonaws.com/images/Likelihood/Likelihood-3_EN.png',
                            },
                        },
                        {
                            type: { value: 'size', display: 'Expected Size?' },
                            graphic: {
                                id: '1-3',
                                url:
                                    'https://ac-assets.s3-us-west-2.amazonaws.com/images/size/Size-1-3_EN.png',
                            },
                        },
                    ],
                    data: {
                        elevations: [
                            { value: 'alp', display: 'Alp' },
                            { value: 'tln', display: 'Tln' },
                        ],
                        aspects: [
                            { value: 'se', display: 'SE' },
                            { value: 's', display: 'S' },
                            { value: 'w', display: 'W' },
                            { value: 'sw', display: 'SW' },
                            { value: 'n', display: 'N' },
                            { value: 'ne', display: 'NE' },
                            { value: 'e', display: 'E' },
                            { value: 'nw', display: 'NW' },
                        ],
                        likelihood: { value: 'possible', display: 'possible' },
                        expectedSize: { min: '1.0', max: '2.0' },
                        terrainAndTravelAdvice:
                            "\u003cul class='ttalist'\u003e\u003cli\u003eUse small slopes with no consequence to test for the presence of the buried weak layer.\u003c/li\u003e\u003cli\u003eWatch for signs of instability such as whumphing, cracking, and evidence of recent avalanches.\u003c/li\u003e\u003cli\u003eStart in conservative terrain while you gather additional information about the snowpack.\u003c/li\u003e\u003c/ul\u003e",
                    },
                    terrainAndTravelAdvice:
                        "\u003cul class='ttalist'\u003e\u003cli\u003eUse small slopes with no consequence to test for the presence of the buried weak layer.\u003c/li\u003e\u003cli\u003eWatch for signs of instability such as whumphing, cracking, and evidence of recent avalanches.\u003c/li\u003e\u003cli\u003eStart in conservative terrain while you gather additional information about the snowpack.\u003c/li\u003e\u003c/ul\u003e",
                },
            ],
            terrainAndTravelAdvice: null,
            message: null,
            season: null,
            comment: null,
            isFullTranslation: false,
        },
        version: 1,
        owner: {
            value: 'avalanche-canada',
            display: 'Avalanche Canada',
            isExternal: false,
        },
    },
    {
        id: 'PC-19_2018-10-01T2200_6bfa80f4-a643-4e84-9ca0-a14511d798c8',
        slug: 'cariboos',
        url: '',
        type: 'offseason',
        area: { id: 'cariboos', name: 'Cariboos' },
        report: {
            id: 'PC-19_2018-10-01T2200_6bfa80f4-a643-4e84-9ca0-a14511d798c8',
            forecaster: 'jfloyer',
            dateIssued: '2018-10-01T22:00:00Z',
            validUntil: '0001-01-01T00:00:00Z',
            title: 'Avalanche Bulletin - Cariboos',
            highlights:
                '\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_AA239A9B"\u003eDaily avalanche forecasts are due to start on Friday, November 23, 2018.\u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_AA239A9B"\u003eSee the forecaster blog \u003c/span\u003e\u003ca href="https://www.avalanche.ca/blogs/early-season-2018" target="_blank"\u003e\u003cspan class="s_9255B882"\u003ehere \u003c/span\u003e\u003c/a\u003e\u003cspan class="s_AA239A9B"\u003efor information on early season conditions.\u003c/span\u003e\u003c/p\u003e',
            confidence: {
                rating: { value: '', display: '' },
                statements: [''],
            },
            summaries: [
                {
                    type: {
                        value: 'avalanche-summary',
                        display: 'Avalanche Summary',
                    },
                    content:
                        '\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_AA239A9B"\u003eAvalanche danger will rise during and immediately after a snow storm. If the temperature rises during or after a storm, or if there is rain, avalanche danger is likely to rise further. Avalanches are more likely if local reports include observations of weak layers.\u003c/span\u003e\u003c/p\u003e',
                },
                {
                    type: {
                        value: 'snowpack-summary',
                        display: 'Snowpack Summary',
                    },
                    content:
                        '\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_AA239A9B"\u003eIf there\'s enough snow to ride, there\'s enough snow to slide.\u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_AA239A9B"\u003eWinter-like wind and storm slabs form readily in alpine bowls--this is generally where avalanches first start to occur. On smooth terrain like glaciers, slopes where there was summer snow, grassy slopes, shale slopes and rock slabs as little as 30cm of snow is enough to create avalanches. On rougher terrain, 50-100 cm snow is generally required.\u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_AA239A9B"\u003eIn some areas, early season weak layers may form. The most common scenario is a layer of sugary snow (facets) that grows near the ground when temperatures get cold and there isn\'t much snow cover. Facets may also be found on glaciers at the bottom of this seasons snowfall.\u003c/span\u003e\u003c/p\u003e',
                },
                {
                    type: { value: 'weather-summary', display: 'Weather Summary' },
                    content:
                        '\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_AA239A9B"\u003eAvalanche Canada\'s Mountain Weather Forecast is now in winter mode focusing on snow amounts, freezing levels and other aspects of weather important to assessing winter conditions in the mountains. These daily briefings are available \u003c/span\u003e\u003ca id=\'GoToAdded\' href="http://avalanche.ca/weather" target="_blank"\u003e\u003cspan class="s_9255B882"\u003ehere \u003c/span\u003e\u003c/a\u003e\u003cspan class="s_AA239A9B"\u003eat avalanche.ca/weather\u003c/span\u003e\u003c/p\u003e\u003cp class="p_CC664AAA"\u003e\u003cspan class="s_AA239A9B"\u003eSPOTWX \u003c/span\u003e\u003ca id=\'GoToAdded\' href="http://spotwx.com" target="_blank"\u003e\u003cspan class="s_9255B882"\u003e(spotwx.com) \u003c/span\u003e\u003c/a\u003e\u003cspan class="s_AA239A9B"\u003eis a good resource for local scale weather forecasts.\u003c/span\u003e\u003c/p\u003e',
                },
            ],
            dangerRatings: [
                {
                    date: { value: '2018-10-02T22:00:00.000Z', display: 'Tuesday' },
                    ratings: {
                        alp: {
                            display: 'Alpine',
                            rating: { value: 'norating', display: 'No Rating' },
                        },
                        tln: {
                            display: 'Treeline',
                            rating: { value: 'norating', display: 'No Rating' },
                        },
                        btl: {
                            display: 'Below Treeline',
                            rating: { value: 'norating', display: 'No Rating' },
                        },
                    },
                },
                {
                    date: {
                        value: '2018-10-03T22:00:00.000Z',
                        display: 'Wednesday',
                    },
                    ratings: {
                        alp: {
                            display: 'Alpine',
                            rating: { value: 'norating', display: 'No Rating' },
                        },
                        tln: {
                            display: 'Treeline',
                            rating: { value: 'norating', display: 'No Rating' },
                        },
                        btl: {
                            display: 'Below Treeline',
                            rating: { value: 'norating', display: 'No Rating' },
                        },
                    },
                },
                {
                    date: {
                        value: '2018-10-04T22:00:00.000Z',
                        display: 'Thursday',
                    },
                    ratings: {
                        alp: {
                            display: 'Alpine',
                            rating: { value: 'norating', display: 'No Rating' },
                        },
                        tln: {
                            display: 'Treeline',
                            rating: { value: 'norating', display: 'No Rating' },
                        },
                        btl: {
                            display: 'Below Treeline',
                            rating: { value: 'norating', display: 'No Rating' },
                        },
                    },
                },
            ],
            problems: [],
            terrainAndTravelAdvice: null,
            message: null,
            season: { value: 'fall', display: 'Early Season Conditions' },
            comment: null,
            isFullTranslation: false,
        },
        version: 1,
        owner: {
            value: 'avalanche-canada',
            display: 'Avalanche Canada',
            isExternal: false,
        },
    },
]
