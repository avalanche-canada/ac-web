import {PropTypes} from 'react'
import {createStructuredSelector} from 'reselect'
import {compose, defaultProps, setPropTypes, withProps, withState, lifecycle, mapProps, getContext, withHandlers} from 'recompose'
import {connect} from 'react-redux'
import * as EntitiesActions from 'actions/entities'
import * as PrismicActions from 'actions/prismic'
import {fitBounds, flyTo} from 'actions/map'
import {
    getForecast as getWeatherForecast,
    getTutorial as getWeatherTutorial,
} from 'selectors/prismic/weather'
import getForecast from 'selectors/forecast'
import getWeatherStation from 'selectors/weather/station'
import getHotZoneReport from 'selectors/hotZoneReport'
import getSpecialInformation from 'selectors/prismic/specialInformation'
import {getToyotaTruckReport, getPost} from 'selectors/prismic'
import getMountainInformationNetworkSubmission, {getId} from 'selectors/mountainInformationNetworkSubmission'
import getFeed, {
    getSidebar as getFeedSidebar,
    getSplash as getFeedSplash,
} from 'selectors/prismic/feed'
import isSameDay from 'date-fns/is_same_day'
import Status from 'utils/status'
import {Predicates} from 'prismic'
import startOfDay from 'date-fns/start_of_day'
import subDays from 'date-fns/sub_days'
import isToday from 'date-fns/is_today'
import format from 'date-fns/format'
import {TYPES, EVENT, NEWS, BLOG} from 'selectors/prismic/feed'
import {getDocumentAndStatus, getResult} from 'selectors/prismic/utils'
import getSponsor, {getSponsorUid} from 'selectors/sponsor'

function connector(mapStateToProps, load, loadAll) {
    return compose(
        connect(mapStateToProps, {
            load,
            loadAll,
            fitBounds,
        }),
        lifecycle({
            componentDidMount() {
                const {load, loadAll, params} = this.props

                load(params)
                loadAll()
            },
            componentWillReceiveProps({load, params}) {
                const {name, date} = this.props.params

                if (name !== params.name || date !== params.date) {
                    load(params)
                }
            },
        }),
        withHandlers({
            onLocateClick: props => event => {
                const {bbox, options} = props.computeBounds()

                props.fitBounds(bbox, options)
            }
        }),
    )
}

export const forecast = connector(
    getForecast,
    EntitiesActions.loadForecast,
    EntitiesActions.loadFeaturesMetadata
)

export const hotZoneReport = compose(
    connect(getHotZoneReport, {
        load: PrismicActions.loadHotZoneReport,
        loadAll: EntitiesActions.loadFeaturesMetadata,
        fitBounds,
    }),
    withHandlers({
        loadSingle: props => params => {
            this.props.load(params)
        },
        onLocateClick: props => event => {
            const {bbox, options} = props.computeBounds()

            props.fitBounds(bbox, options)
        }
    }),
    lifecycle({
        componentDidMount() {
            const {loadSingle, loadAll, params} = this.props

            loadSingle(params)
            loadAll()
        },
        componentWillReceiveProps({load, params}) {
            const {name, date} = this.props.params

            if (name !== params.name || date !== params.date) {
                this.props.loadSingle(params)
            }
        },
    }),
)

function panelConnector(mapStateToProps, load) {
    return compose(
        getContext({
            location: PropTypes.object.isRequired,
        }),
        connect(mapStateToProps, {
            load,
            flyTo,
        }),
        withProps(props => ({
            load() {
                props.load(getId(props))
            }
        })),
        lifecycle({
            componentDidMount() {
                const {props} = this

                props.load()
            },
            componentWillReceiveProps(props) {
                if (getId(props) !== getId(this.props)) {
                    props.load()
                }
            },
        }),
        withHandlers({
            onLocateClick: props => event => {
                props.flyTo(props.computeFlyTo())
            }
        }),
    )
}

export const mountainInformationNetworkSubmission = panelConnector(
    getMountainInformationNetworkSubmission,
    EntitiesActions.loadMountainInformationNetworkSubmission,
)

export const weatherStation = panelConnector(
    getWeatherStation,
    EntitiesActions.loadWeatherStation,
)

export function prismic(mapStateToProps, mapDispatchToProps = {}) {
    const {load, paramsToKey} = PrismicActions

    return compose(
        setPropTypes({
            params: PropTypes.object.isRequired,
        }),
        connect(mapStateToProps, {
            load,
            ...mapDispatchToProps
        }),
        lifecycle({
            componentDidMount() {
                this.props.load(this.props.params)
            },
            componentWillReceiveProps({params}) {
                if (paramsToKey(params) !== paramsToKey(this.props.params)) {
                    this.props.load(params)
                }
            },
        }),
    )
}

export const generic = compose(
    withProps(props => ({
        params: {
            type: props.type || 'generic',
            uid: props.uid,
        }
    })),
    prismic(getDocumentAndStatus),
)

export const post = compose(
    withProps(props => ({
        params: {
            type: props.type,
            uid: props.params.uid,
        }
    })),
    prismic(getPost),
)

export const sponsor = compose(
    connect(createStructuredSelector({
        uid: getSponsorUid
    })),
    withProps(props => ({
        params: {
            type: 'sponsor',
            uid: props.uid || null,
        }
    })),
    prismic(getSponsor),
)

function panelPrismicConnectorFactory(type, mapStateToProps) {
    return compose(
        getContext({
            location: PropTypes.object.isRequired,
        }),
        withProps(props => ({
            params: {
                type,
                uid: props.id,
            }
        })),
        prismic(mapStateToProps, {
            flyTo,
            fitBounds,
        }),
        withHandlers({
            onLocateClick: props => event => {
                if (props.computeFlyTo()) {
                    props.flyTo(props.computeFlyTo())
                }
                if (props.computeBounds()) {
                    const {bbox, options} = props.computeBounds()

                    props.fitBounds(bbox, options)
                }
            }
        }),
    )
}

export const specialInformation = panelPrismicConnectorFactory(
    'special-information',
    getSpecialInformation,
)

export const toyotaTruckReport = panelPrismicConnectorFactory(
    'toyota-truck-report',
    getToyotaTruckReport,
)

export const feed = compose(
    setPropTypes({
        type: PropTypes.string.isRequired,
    }),
    withProps(({type}) => ({
        params: {
            type,
            options: {
                pageSize: 250,
            }
        }
    })),
    prismic(getFeed),
)

export const feedSidebar = compose(
    setPropTypes({
        type: PropTypes.oneOf(TYPES).isRequired,
        uid: PropTypes.string,
    }),
    withProps(({type}) => {
        let predicate
        let ordering

        if (type === EVENT) {
            const date = format(subDays(startOfDay(new Date()), 1), 'YYYY-MM-DD')

            predicate = Predicates.dateAfter('my.event.start_date', date)
            ordering = 'my.event.start_date'
        } else {
            predicate = Predicates.at('document.tags', ['featured'])
            ordering = `my.${type}.date desc`
        }

        return {
            params: {
                type,
                predicates: [predicate],
                options: {
                    pageSize: 7,
                    orderings: [ordering],
                }
            }
        }
    }),
    prismic(getFeedSidebar),
)

export const feedSplash = compose(
    setPropTypes({
        type: PropTypes.oneOf(TYPES).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
    }),
    withProps(({type, tags = []}) => {
        const params = {
            type,
            predicates: [],
            options: {
                pageSize: 5,
                orderings: [
                    `my.${type}.date desc`,
                ],
            }
        }

        if (tags.length > 0) {
            params.predicates.push(Predicates.at('document.tags', tags))
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
            params
        }
    }),
    prismic(getFeedSplash),
)

function createWeatherForecastParams(date) {
    return {
        type: 'weather-forecast',
        predicates: [
            Predicates.at('my.weather-forecast.date', format(date, 'YYYY-MM-DD'))
        ]
    }
}

export const weatherForecast = compose(
    setPropTypes({
        date: PropTypes.instanceOf(Date).isRequired,
    }),
    defaultProps({
        date: new Date()
    }),
    withState('params', 'setParams', props => createWeatherForecastParams(props.date)),
    connect(createStructuredSelector({
        result: getResult
    })),
    lifecycle({
        componentWillReceiveProps({date, result}) {
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
    prismic(getWeatherForecast),
)

export const weatherTutorial = compose(
    setPropTypes({
        uid: PropTypes.string.isRequired,
    }),
    withProps(props => ({
        params: {
            type: 'weather-forecast-tutorial',
            uid: props.uid
        },
    })),
    prismic(getWeatherTutorial),
)

export const documentLink = compose(
    setPropTypes({
        type: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    }),
    withProps(({type, uid}) => ({
        params: {
            type,
            uid,
        }
    })),
    prismic(getDocumentAndStatus),
)
