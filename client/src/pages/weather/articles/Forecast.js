import React, {PropTypes, Component} from 'react'
import {findDOMNode} from 'react-dom'
import {compose, withState, toClass} from 'recompose'
import moment from 'moment'
import {withRouter} from 'react-router'
import {resolve} from 'react-resolver'
import {Article} from 'components/page'
import {Date as DateElement, DateTime, Loading, Muted} from 'components/misc'
import {ExpandMore} from 'components/icons'
import Button, {SUBTILE} from 'components/button'
import {Metadata, Entry} from 'components/metadata'
import Callout, {BOTTOM} from 'components/callout'
import Forecast from 'components/weather'
import {Api, Predicates} from 'prismic'
import {Overlay} from 'react-overlays'
import DayPicker, {DateUtils} from 'react-day-picker'
import 'react-day-picker/lib/style.css'

const ButtonClass = toClass(Button)
const {isSameDay} = DateUtils

function fetchForecast({params: {date = new Date()}}) {
    const type = 'new-weather-forecast'
    const predicates = [
        Predicates.at('document.type', type),
        Predicates.at(`my.${type}.date`, moment(date).format('YYYY-MM-DD')),
    ]

    return Api.Api()
        .then(api => api.query(...predicates).submit())
        .then(response => response.results[0], err => new Error('Error happened while fetching forecast.'))
}

@withRouter
@resolve('forecast', fetchForecast)
export default class Container extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }
    static defaultProps = {
        isAuthenticated: false
    }
    state = {
        showCalendar: false,
        isFetching: false,
    }
    set showCalendar(showCalendar) {
        this.setState({showCalendar})
    }
    get showCalendar() {
        return this.state.showCalendar
    }
    set isFetching(isFetching) {
        this.setState({isFetching})
    }
    toggleCalendar = event => {
        this.showCalendar = !this.showCalendar
    }
    handleDayClick = (event, date, modifiers) => {
        if (modifiers.disabled) {
            return
        }

        const location = `/weather/forecast/${moment(date).format('YYYY-MM-DD')}`

        this.showCalendar = false
        this.props.router.push(location)
    }
    render() {
        const {params, isAuthenticated, forecast, children} = this.props
        const {showCalendar, isFetching} = this.state
        const date = moment(params.date).toDate()
        const issued = forecast && forecast.getTimestamp(`${forecast.type}.issued`)
        const handle = forecast && forecast.getText(`${forecast.type}.handle`)
        const today = new Date()

        return (
            <Article>
                <Metadata>
                    <Entry term='Date'>
                        <DateElement value={date} />
                        <ButtonClass ref='target' icon={<ExpandMore />} kind={SUBTILE} onClick={this.toggleCalendar} />
                    </Entry>
                    {issued &&
                        <Entry term='Issued'>
                            <DateTime value={issued} />
                        </Entry>
                    }
                    {handle &&
                        <Entry term='Created by'>
                            {handle}
                        </Entry>
                    }
                </Metadata>
                <Overlay show={showCalendar} placement='bottom' shouldUpdatePosition target={() => findDOMNode(this.refs.target)}>
                    <div style={{position: 'absolute'}}>
                        <Callout placement={BOTTOM}>
                            <DayPicker
                                selectedDays={day => moment(day).isSame(date, 'day')}
                                disabledDays={day => moment(day).isAfter(today, 'day')}
                                onDayClick={this.handleDayClick} />
                        </Callout>
                    </div>
                </Overlay>
                <Loading show={isFetching}>
                    Loading weather forecast for <DateElement value={date} />...
                </Loading>
                <Muted show={!isFetching && !forecast}>
                    No weather forecast available for <DateElement value={date} />.
                </Muted>
                <Forecast isAuthenticated={isAuthenticated} document={forecast} />
            </Article>
        )
    }
}
