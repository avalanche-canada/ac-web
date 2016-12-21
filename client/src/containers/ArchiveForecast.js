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
import {loadFeaturesMetadata, loadForecast} from 'actions/entities'
import {formatAsDay, parseFromDay} from 'utils/date'
import mapStateToProps from 'selectors/archives'

@connect(mapStateToProps, {
    loadForecast,
    loadFeaturesMetadata,
})
@withRouter
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
            name,
            date: date && moment(date).toDate(),
        }
        this.today = new Date()
    }
    handleRegionChange = name => {
        this.setState({name}, this.tryTransition)
    }
    handleDateChange = date => {
        this.setState({date}, this.tryTransition)
    }
    tryTransition = () => {
        const {date, name} = this.state

        if (date && name) {
            const path = `/forecasts/${name}/archives/${formatAsDay(date)}`

            this.props.router.push(path)
        }
    }
    handleDisabledDays = day => {
        return moment(day).isSameOrAfter(this.today, 'day')
    }
    loadForecast({name, date}) {
        if (name && date) {
            this.props.loadForecast({name, date})
        }
    }
    componentDidMount() {
        this.props.loadFeaturesMetadata()
        this.loadForecast(this.props.params)
    }
    componentWillReceiveProps({params, location}) {
        this.today = new Date()
        this.loadForecast(params)

        if (Object.keys(params).length === 0) {
            this.setState({
                name: undefined,
                date: undefined,
            })
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

        // TODO: Region list sould be filterable

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
                        {forecast && <Forecast {...forecast} />}
                    </Main>
                </Content>
            </Page>
        )
    }
}
