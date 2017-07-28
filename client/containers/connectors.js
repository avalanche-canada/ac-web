import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import {
    compose,
    defaultProps,
    setPropTypes,
    withProps,
    withState,
    lifecycle,
    withHandlers,
    mapProps,
} from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as EntitiesActions from '~/actions/entities'
import * as PrismicActions from '~/actions/prismic'
import { fitBounds, flyTo } from '~/actions/map'
import {
    getForecast as getWeatherForecast,
    getTutorial as getWeatherTutorial,
} from '~/selectors/prismic/weather'
import getForecast, { getForecastRegions } from '~/selectors/forecast'
import getWeatherStation from '~/selectors/weather/station'
import getHotZoneReport, {
    getHotZones,
    getHotZoneReportDateRanges,
    getArchiveHotZoneReport,
} from '~/selectors/hotZoneReport'
import getSpecialInformation from '~/selectors/prismic/specialInformation'
import getFatalAccident from '~/selectors/prismic/fatalAccident'
import { getToyotaTruckReport, getPost } from '~/selectors/prismic'
import getMountainInformationNetworkSubmission, {
    getId,
} from '~/selectors/mountainInformationNetworkSubmission'
import getFeed, {
    getSidebar as getFeedSidebar,
    getSplash as getFeedSplash,
    TYPES,
    EVENT,
} from '~/selectors/prismic/feed'
import { Predicates } from '~/prismic'
import startOfDay from 'date-fns/start_of_day'
import subDays from 'date-fns/sub_days'
import isToday from 'date-fns/is_today'
import format from 'date-fns/format'
import { makeGetDocumentAndStatus, getResult } from '~/selectors/prismic/utils'
import getSponsor, { getSponsorUid } from '~/selectors/sponsor'
import get from 'lodash/get'
import { parse } from '~/prismic'

export const forecast = compose(
    withRouter,
    connect(getForecast, {
        load: EntitiesActions.loadForecast,
        loadAll: EntitiesActions.loadFeaturesMetadata,
        fitBounds,
    }),
    withHandlers({
        redirectToForecasts: props => payload => {
            if (get(payload, 'value.result.length') === 0) {
                // TODO: Display a message to let user know about redirection !
                props.history.push('/forecasts')
            }
        },
    }),
    lifecycle({
        componentDidMount() {
            const {
                load,
                loadAll,
                name,
                date,
                redirectToForecasts,
            } = this.props
            const params = { name, date }

            load(params).then(redirectToForecasts)
            loadAll()
        },
        componentWillReceiveProps({ load, name, date }) {
            if (name !== this.props.name || date !== this.props.date) {
                const params = { name, date }

                load(params).then(this.props.redirectToForecasts)
            }
        },
    }),
    withHandlers({
        onLocateClick: props => () => {
            const { bbox, options } = props.computeBounds()

            props.fitBounds(bbox, options)
        },
    })
)

export const archiveForecast = compose(
    connect(
        createStructuredSelector({
            regions: getForecastRegions,
            data: getForecast,
        }),
        {
            load: EntitiesActions.loadForecast,
            loadAll: EntitiesActions.loadFeaturesMetadata,
        }
    ),
    withHandlers({
        onParamsChange: props => ({ name, date }) => {
            const paths = ['/forecasts', 'archives']

            if (name) {
                paths.push(name)
            }

            if (date) {
                paths.push(date)
            }

            props.history.push(paths.join('/'))
        },
        loadForecast: props => () => {
            const { name, date } = props

            if (name && date) {
                props.load({ name, date })
            }
        },
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadForecast()
            this.props.loadAll()
        },
        componentDidUpdate({ name, date }) {
            if (name !== this.props.name || date !== this.props.date) {
                this.props.loadForecast()
            }
        },
    })
)

export const hotZoneReport = compose(
    connect(getHotZoneReport, {
        load: PrismicActions.loadHotZoneReport,
        loadAll: EntitiesActions.loadFeaturesMetadata,
        fitBounds,
    }),
    lifecycle({
        componentDidMount() {
            const { load, loadAll, name, uid } = this.props

            load({ name, uid })
            loadAll()
        },
        componentWillReceiveProps({ load, name, date }) {
            if (name !== this.props.name || date !== this.props.date) {
                load({ name, date })
            }
        },
    }),
    withHandlers({
        onLocateClick: props => () => {
            const { bbox, options } = props.computeBounds()

            props.fitBounds(bbox, options)
        },
    }),
    withProps(({ report }) => {
        if (report) {
            report = parse(report).data
        }

        return { report }
    })
)

export const archiveHotZoneReport = compose(
    connect(
        createStructuredSelector({
            regions: getHotZones,
            dateRanges: getHotZoneReportDateRanges,
            data: getArchiveHotZoneReport,
        }),
        {
            load: PrismicActions.load,
            loadAll: EntitiesActions.loadFeaturesMetadata,
        }
    ),
    withHandlers({
        onParamsChange: props => ({ name, date }) => {
            const paths = ['/hot-zone-reports', 'archives']

            if (name) {
                paths.push(name)
            }

            if (date) {
                paths.push(date)
            }

            props.history.push(paths.join('/'))
        },
        loadHotZoneReportsForRegion: props => region => {
            const type = 'hotzone-report'

            props.load({
                type,
                predicates: [Predicates.field(type, 'region', region)],
                options: {
                    pageSize: 250,
                },
            })
        },
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadAll()

            const { name } = this.props.params

            if (name) {
                this.props.loadHotZoneReportsForRegion(name)
            }
        },
        componentWillReceiveProps({ params: { name } }) {
            if (name && name !== this.props.params.name) {
                this.props.loadHotZoneReportsForRegion(name)
            }
        },
    })
)

function panelConnector(mapStateToProps, load) {
    return compose(
        connect(mapStateToProps, {
            load,
            flyTo,
        }),
        withProps(props => ({
            load() {
                props.load(getId(props))
            },
        })),
        lifecycle({
            componentDidMount() {
                const { props } = this

                props.load()
            },
            componentWillReceiveProps(props) {
                if (getId(props) !== getId(this.props)) {
                    props.load()
                }
            },
        }),
        withHandlers({
            onLocateClick: props => () => {
                props.flyTo(props.computeFlyTo())
            },
        })
    )
}

export const mountainInformationNetworkSubmission = panelConnector(
    getMountainInformationNetworkSubmission,
    EntitiesActions.loadMountainInformationNetworkSubmission
)

export const weatherStation = panelConnector(
    getWeatherStation,
    EntitiesActions.loadWeatherStation
)

export function prismic(mapStateToProps, mapDispatchToProps = {}) {
    const { load, paramsToKey } = PrismicActions

    return compose(
        setPropTypes({
            params: PropTypes.object.isRequired,
        }),
        connect(mapStateToProps, {
            load,
            ...mapDispatchToProps,
        }),
        lifecycle({
            componentDidMount() {
                this.props.load(this.props.params)
            },
            componentWillReceiveProps({ params }) {
                if (paramsToKey(params) !== paramsToKey(this.props.params)) {
                    this.props.load(params)
                }
            },
        })
    )
}

// TODO: Modify code to use this function instead of prismic
export function prismicPatch(params, mapStateToProps, mapDispatchToProps = {}) {
    function computeParams(props) {
        return typeof params === 'function' ? params(props) : params
    }

    return compose(
        connect(mapStateToProps, {
            load: PrismicActions.load,
            ...mapDispatchToProps,
        }),
        lifecycle({
            componentDidMount() {
                this.props.load(computeParams(this.props))
            },
            componentWillReceiveProps(props) {
                this.props.load(computeParams(props))
            },
        })
    )
}

export function withParams(params) {
    return withProps(props => {
        if (typeof params === 'function') {
            params = params(props)
        }

        return {
            params,
        }
    })
}

export const generic = compose(
    setPropTypes({
        type: PropTypes.string,
        uid: PropTypes.string.isRequired,
    }),
    withParams(props => ({
        type: props.type || 'generic',
        uid: props.uid,
    })),
    prismic(makeGetDocumentAndStatus),
    mapProps(props => {
        delete props.type
        delete props.uid
        delete props.params
        delete props.load

        return props
    })
)

export const tutorial = compose(
    setPropTypes({
        splat: PropTypes.string.isRequired,
    }),
    withProps(props => ({
        params: {
            predicates: [
                Predicates.field('tutorial-page', 'slug', props.splat),
            ],
        },
    })),
    prismic(makeGetDocumentAndStatus)
)

export const post = compose(
    withParams(props => ({
        type: props.type,
        uid: props.match.params.uid,
    })),
    prismic(getPost)
)

export const sponsor = compose(
    connect(
        createStructuredSelector({
            uid: getSponsorUid,
        })
    ),
    withParams(props => ({
        type: 'sponsor',
        uid: props.uid || null,
    })),
    prismic(getSponsor)
)

function panelPrismicConnectorFactory(type, mapStateToProps) {
    return compose(
        withParams(props => ({
            type,
            uid: props.id,
        })),
        prismic(mapStateToProps, {
            flyTo,
            fitBounds,
        }),
        withHandlers({
            onLocateClick: props => () => {
                if (
                    typeof props.computeFlyTo === 'function' &&
                    props.computeFlyTo()
                ) {
                    return props.flyTo(props.computeFlyTo())
                }
                if (
                    typeof props.computeBounds === 'function' &&
                    props.computeBounds()
                ) {
                    const { bbox, options } = props.computeBounds()

                    return props.fitBounds(bbox, options)
                }
            },
        })
    )
}

export const specialInformation = panelPrismicConnectorFactory(
    'special-information',
    getSpecialInformation
)

export const fatalAccident = panelPrismicConnectorFactory(
    'fatal-accident',
    getFatalAccident
)

export const toyotaTruckReport = panelPrismicConnectorFactory(
    'toyota-truck-report',
    getToyotaTruckReport
)

export const feed = compose(
    setPropTypes({
        type: PropTypes.string.isRequired,
    }),
    withParams(props => ({
        type: props.type,
        options: {
            pageSize: 250,
        },
    })),
    prismic(getFeed)
)

export const feedSidebar = compose(
    setPropTypes({
        type: PropTypes.oneOf(TYPES).isRequired,
        uid: PropTypes.string,
    }),
    withProps(({ type }) => {
        let predicate
        let ordering

        if (type === EVENT) {
            const date = format(
                subDays(startOfDay(new Date()), 1),
                'YYYY-MM-DD'
            )

            predicate = Predicates.dateAfter('my.event.start_date', date)
            ordering = 'my.event.start_date'
        } else {
            predicate = Predicates.tags('featured')
            ordering = `my.${type}.date desc`
        }

        return {
            params: {
                type,
                predicates: [predicate],
                options: {
                    pageSize: 7,
                    orderings: [ordering],
                },
            },
        }
    }),
    prismic(getFeedSidebar)
)

export const feedSplash = compose(
    setPropTypes({
        type: PropTypes.oneOf(TYPES).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
    }),
    withProps(({ type, tags = [] }) => {
        const params = {
            type,
            predicates: [],
            options: {
                pageSize: 5,
                orderings: [`my.${type}.date desc`],
            },
        }

        if (tags.length > 0) {
            params.predicates.push(Predicates.tags(tags))
        }

        if (type === EVENT) {
            params.predicates.push(
                Predicates.dateAfter(
                    `my.${EVENT}.start_date`,
                    format(new Date(), 'YYYY-MM-DD')
                )
            )
            params.orderings = [`my.${EVENT}.start_date`]
        }

        return {
            params,
        }
    }),
    prismic(getFeedSplash)
)

function createWeatherForecastParams(date) {
    const type = 'weather-forecast'

    return {
        type,
        predicates: [
            Predicates.field(type, 'date', format(date, 'YYYY-MM-DD')),
        ],
    }
}

export const weatherForecast = compose(
    setPropTypes({
        date: PropTypes.instanceOf(Date).isRequired,
    }),
    defaultProps({
        date: new Date(),
    }),
    withState('params', 'setParams', props =>
        createWeatherForecastParams(props.date)
    ),
    connect(
        createStructuredSelector({
            result: getResult,
        })
    ),
    lifecycle({
        componentWillReceiveProps({ date, result }) {
            let params

            if (date !== this.props.date) {
                params = createWeatherForecastParams(date)
            }

            if (isToday(date) && result.isLoaded && result.ids.size === 0) {
                params = createWeatherForecastParams(subDays(date, 1))
            }

            if (params) {
                this.props.setParams(params)
            }
        },
    }),
    prismic(getWeatherForecast)
)

export const weatherTutorial = compose(
    setPropTypes({
        uid: PropTypes.string.isRequired,
    }),
    withParams(props => ({
        type: 'weather-forecast-tutorial',
        uid: props.uid,
    })),
    prismic(getWeatherTutorial)
)

export const documentLink = compose(
    setPropTypes({
        type: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    }),
    withParams(props => ({
        type: props.type,
        uid: props.uid,
    })),
    prismic(makeGetDocumentAndStatus)
)
