import React, {PropTypes, Component, createElement} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {compose, withHandlers} from 'recompose'
import {Link, withRouter} from 'react-router'
import {Page, Content, Header, Main, Section, Headline} from 'components/page'
import Forecast from 'components/forecast'
import {Muted, Error, Br, DateElement} from 'components/misc'
import {Metadata, Entry} from 'components/metadata'
import {DateIssued, ValidUntil, Forecaster} from 'components/forecast/Metadata'
import {DropdownFromOptions as Dropdown, DayPicker} from 'components/controls'
import {forecast} from 'containers/connectors'
import {loadForecastRegions, loadForecast} from 'actions/entities'
import {formatAsDay, parseFromDay} from 'utils/date'
import mapStateToProps from 'selectors/archives'

@withRouter
@connect(mapStateToProps, {
    loadForecast,
    loadForecastRegions,
})
export default class ArchiveForecast extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        forecast: PropTypes.object,
        isLoading: PropTypes.bool.isRequired,
        isError: PropTypes.bool.isRequired,
        link: PropTypes.object,
    }
    constructor(props) {
        super(props)

        const {name, date} = props.params

        this.state = {
            name: name || null,
            date: date ? new Date(date) : null,
        }
        this.today = new Date()
    }
    handleRegionChange = name => {
        this.setState({name}, this.validate)
    }
    handleDateChange = date => {
        this.setState({date}, this.validate)
    }
    validate = () => {
        const {date, name} = this.state

        if (date && name) {
            const path = `/forecasts/${name}/archives/${formatAsDay(date)}`

            this.props.router.push(path)
        }
    }
    handleDisabledDays = day => {
        return moment(day).isSameOrAfter(this.today, 'day')
    }
    loadForecast() {
        const {loadForecast, params} = this.props
        const {name, date} = params

        if (name && date) {
            console.warn(params)
            loadForecast(params)
        }
    }
    componentDidMount() {
        this.props.loadForecastRegions()
        this.loadForecast()
    }
    componentDidUpdate() {
        this.today = new Date()
    }
    componentWillReceiveProps({params, location}) {
        if (location.key !== this.props.location.key) {
            this.loadForecast()
        }
    }
    render() {
        const {
            title,
            forecast,
            isLoading,
            isError,
            link,
            params,
            onChangeDate,
            regionOptions,
        } = this.props
        const {name, date} = this.state
        let header = 'FORECAST ARCHIVE'

        if (forecast) {
            header += `: ${title}`
        }

        return (
            <Page>
                <Header title={header} />
                <Content>
                    <Main>
                        <Metadata>
                            <Entry>
                                <Dropdown options={regionOptions} value={name} onChange={this.handleRegionChange} disabled placeholder='Select a region' />
                            </Entry>
                            <Entry>
                                <DayPicker date={date} onChange={this.handleDateChange} disabledDays={this.handleDisabledDays} container={this} >
                                    {date ?
                                        <DateElement value={date} format='dddd, LL' /> :
                                        'Select a date'}
                                </DayPicker>
                            </Entry>
                            {forecast && <DateIssued {...forecast} />}
                            {forecast && <ValidUntil {...forecast} />}
                            {forecast && <Forecaster {...forecast} />}
                        </Metadata>
                        {isLoading && <Muted>Loading forecast...</Muted>}
                        {isError && <Error>Error happened while loading forecast.</Error>}
                        {(forecast && forecast.region) && <Forecast {...forecast} />}
                    </Main>
                </Content>
            </Page>
        )
    }
}
