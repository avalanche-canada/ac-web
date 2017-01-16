import {PropTypes} from 'react'
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
import getMountainInformationNetworkSubmission, {getId} from 'selectors/mountainInformationNetworkSubmission'
import getFeed from 'selectors/prismic/feed'
import isSameDay from 'date-fns/is_same_day'
import Status from 'utils/status'
import {Predicates} from 'prismic'

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

// TODO: Remove that function when the store will keep track of the state
// TODO: Use Status object
function connectorWithState(mapStateToProps, load, loadAll) {
    return compose(
        withState('isLoading', 'setIsLoading', false),
        withState('isLoaded', 'setIsLoaded', false),
        withState('isError', 'setIsError', false),
        connect(mapStateToProps, {
            load,
            loadAll,
            fitBounds,
        }),
        withHandlers({
            loadSingle: props => params => {
                const {load, setIsLoading, setIsLoaded, setIsError} = props

                const promise = load(params)

                if (promise && typeof promise.then === 'function') {
                    setIsLoading(true)

                    function onFulfilled() {
                        setIsLoading(false)
                        setIsLoaded(true)
                    }
                    function onRejected() {
                        setIsLoading(false)
                        setIsError(true)
                    }

                    return promise.then(onFulfilled, onRejected)
                }

                return promise
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
}

export const forecast = connector(
    getForecast,
    EntitiesActions.loadForecast,
    EntitiesActions.loadFeaturesMetadata
)

export const hotZoneReport = connectorWithState(
    getHotZoneReport,
    PrismicActions.loadHotZoneReport,
    EntitiesActions.loadFeaturesMetadata
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

function prismicConnector(mapStateToProps, load) {
    return compose(
        // TODO: Remove that state when the store will keep track of the state
        withState('isLoading', 'setIsLoading', false),
        // TODO: Remove that state when the store will keep track of the state
        withState('isLoaded', 'setIsLoaded', false),
        // TODO: Remove that state when the store will keep track of the state
        withState('isError', 'setIsError', false),
        getContext({
            location: PropTypes.object.isRequired,
        }),
        connect(mapStateToProps, {
            load,
            flyTo,
            fitBounds,
        }),
        lifecycle({
            componentDidMount() {
                const promise = this.props.load()

                if (promise && typeof promise.then === 'function') {
                    const {setIsLoading, setIsLoaded, setIsError} = this.props

                    setIsLoading(true)

                    function onFulfilled() {
                        setIsLoading(false)
                        setIsLoaded(true)
                    }
                    function onRejected() {
                        setIsLoading(false)
                        setIsError(true)
                    }

                    return promise.then(onFulfilled, onRejected)
                }

                return promise
            },
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

// TODO: Add the toyota truck connector!!!

export const specialInformation = prismicConnector(
    getSpecialInformation,
    PrismicActions.loadSpecialInformation,
)

export function feed() {
    return compose(
        setPropTypes({
            type: PropTypes.string.isRequired,
        }),
        connect(getFeed, {
            load: PrismicActions.loadForType
        }),
        lifecycle({
            componentDidMount() {
                this.props.load(this.props.type, {
                    pageSize: 250
                })
            }
        }),
    )
}

export const weatherForecast = compose(
    // TODO: Remove that state when the store will keep track of the state
    withState('status', 'setStatus', new Status()),
    connect(getWeatherForecast, {
        loadWeatherForecast: PrismicActions.loadWeatherForecast
    }),
    setPropTypes({
        date: PropTypes.instanceOf(Date).isRequired,
    }),
    defaultProps({
        date: new Date()
    }),
    withHandlers({
        load: props => date => {
            const status = props.status.start()

            props.setStatus(status)

            return props.loadWeatherForecast(date, true).then(
                () => props.setStatus(status.fulfill()),
                () => props.setStatus(status.reject())
            )
        },
    }),
    lifecycle({
        componentDidMount() {
            this.props.load(this.props.date)
        },
        componentWillReceiveProps({date = new Date()}) {
            if (!isSameDay(date, this.props.date)) {
                this.props.load(date)
            }
        },
    })
)

export const weatherTutorial = compose(
    withState('status', 'setStatus', new Status()),
    setPropTypes({
        uid: PropTypes.string.isRequired,
    }),
    connect(getWeatherTutorial, {
        loadForUid: PrismicActions.loadForUid
    }),
    lifecycle({
        componentDidMount() {
            const {loadForUid, setStatus} = this.props
            const status = this.props.status.start()

            setStatus(status)

            this.props.loadForUid('weather-forecast-tutorial', this.props.uid).then(
                () => setStatus(status.fulfill()),
                () => setStatus(status.reject()),
            )
        }
    }),
)
