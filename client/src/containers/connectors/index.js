import {PropTypes} from 'react'
import {compose, withProps, withState, lifecycle, mapProps, getContext} from 'recompose'
import {connect} from 'react-redux'
import * as Actions from 'actions/entities'
import getForecast from 'selectors/forecast'
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
            componentWillReceiveProps({load, params, isError}) {
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

export const mountainInformationNetworkSubmission = compose(
    getContext({
        location: PropTypes.object.isRequired,
    }),
    connect(getMountainInformationNetworkSubmission, {
        load: Actions.loadMountainInformationNetworkSubmission,
    }),
    withProps(props => ({
        load() {
            props.load(getId(props))
        }
    })),
    lifecycle({
        componentDidMount() {
            this.props.load()
        },
        componentWillReceiveProps(props) {
            if (getId(props) !== getId(this.props)) {
                props.load()
            }
        },
    })
)

export const weatherStation = compose(
    
)
