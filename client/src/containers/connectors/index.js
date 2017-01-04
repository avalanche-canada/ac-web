import {PropTypes} from 'react'
import {compose, withProps, withState, lifecycle, mapProps, getContext, withHandlers} from 'recompose'
import {connect} from 'react-redux'
import * as EntitiesActions from 'actions/entities'
import * as PrismicActions from 'actions/prismic'
import {fitBounds, flyTo} from 'actions/map'
import getForecast from 'selectors/forecast'
import getWeatherStation from 'selectors/weather/station'
import getHotZoneReport from 'selectors/hotZoneReport'
import getMountainInformationNetworkSubmission, {getId} from 'selectors/mountainInformationNetworkSubmission'

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

// TODO: Remove that function when the store will keep xtrack on the state
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
        lifecycle({
            componentDidMount() {
                const {load, loadAll, params, setIsLoading, setIsLoaded, setIsError} = this.props

                setIsLoading(true)

                function onFulfilled() {
                    setIsLoading(false)
                    setIsLoaded(true)
                }
                function onRejected() {
                    setIsLoading(false)
                    setIsError(true)
                }

                load(params).then(onFulfilled, onRejected)
                loadAll()
            },
            componentWillReceiveProps({load, params}) {
                const {name, date} = this.props.params

                if (name !== params.name || date !== params.date) {
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
