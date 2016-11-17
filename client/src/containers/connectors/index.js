import {PropTypes} from 'react'
import {compose, withProps, withState, lifecycle, mapProps, getContext} from 'recompose'
import {connect} from 'react-redux'
import * as Actions from 'actions/entities'
import getForecast from 'selectors/forecast'
import getWeatherStation from 'selectors/weather/station'
import getHotZoneReport from 'selectors/hotZoneReport'
import getMountainInformationNetworkSubmission, {getId} from 'selectors/mountainInformationNetworkSubmission'

function connector(mapStateToProps, load, loadAll) {
    return compose(
        connect(mapStateToProps, {
            load,
            loadAll,
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
    )
}

export const forecast = connector(
    getForecast,
    Actions.loadForecast,
    Actions.loadForecastRegions
)

export const hotZoneReport = connector(
    getHotZoneReport,
    Actions.loadHotZoneReports,
    Actions.loadHotZoneAreas
)

function panelConnector(mapStateToProps, load) {
    return compose(
        getContext({
            location: PropTypes.object.isRequired,
        }),
        connect(mapStateToProps, {load}),
        withProps(props => ({
            load() {
                props.load({
                    id: getId(props)
                })
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
        })
    )
}

export const mountainInformationNetworkSubmission = panelConnector(
    getMountainInformationNetworkSubmission,
    Actions.loadMountainInformationNetworkSubmission,
)

export const weatherStation = panelConnector(
    getWeatherStation,
    Actions.loadWeatherStation,
)
