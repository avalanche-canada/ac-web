import React, {PropTypes, Component} from 'react'
import {findDOMNode} from 'react-dom'
import {compose, withState, toClass} from 'recompose'
import moment from 'moment'
import {withRouter} from 'react-router'
import {loadForType} from 'actions/prismic'
import {connect} from 'react-redux'
import {Article} from 'components/page'
import {DateElement, DateTime, Loading, Muted} from 'components/misc'
import {ExpandMore} from 'components/icons'
import Button, {SUBTILE} from 'components/button'
import {Metadata, Entry} from 'components/metadata'
import Callout, {BOTTOM} from 'components/callout'
import Forecast from 'components/weather'
import {Api, Predicates} from 'prismic'
import {Overlay} from 'react-overlays'
import {getForecast} from 'selectors/prismic/weather'
import DayPicker, {DateUtils} from 'react-day-picker'
import 'react-day-picker/lib/style.css'

const ButtonClass = toClass(Button)
const {isSameDay} = DateUtils
function formatDate(date) {
    return moment(date).format('YYYY-MM-DD')
}

@withRouter
@connect(getForecast, {loadForType})
export default class Container extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }
    static defaultProps = {
        isAuthenticated: false,
    }
    state = {
        showCalendar: false,
    }
    set showCalendar(showCalendar) {
        this.setState({showCalendar})
    }
    get showCalendar() {
        return this.state.showCalendar
    }
    toggleCalendar = event => {
        this.showCalendar = !this.showCalendar
    }
    handleDayClick = (event, date, modifiers) => {
        if (modifiers.disabled) {
            return
        }

        this.showCalendar = false
        this.props.router.push(`/weather/forecast/${formatDate(date)}`)
    }
    componentDidMount() {
        this.load()
    }
    componentWillReceiveProps({params}) {
        if (params.date !== this.props.params.date) {
            this.load(params.date)
        }
    }
    load(date = this.props.params.date) {
        const type = 'new-weather-forecast'
        const options = {
            predicates: [Predicates.at(`my.${type}.date`, date)]
        }

        this.props.loadForType(type, options)
    }
    render() {
        const {params, isAuthenticated, forecast, children, isLoading} = this.props
        const {showCalendar} = this.state
        const date = moment(params.date).toDate()
        const today = new Date()

        return (
            <Article>
                <Metadata>
                    <Entry term='Date'>
                        <DateElement value={date} />
                        <ButtonClass ref='target' icon={<ExpandMore />} kind={SUBTILE} onClick={this.toggleCalendar} />
                    </Entry>
                    {(forecast && forecast.issued) &&
                        <Entry term='Issued'>
                            <DateTime value={forecast.issued} />
                        </Entry>
                    }
                    {(forecast && forecast.handle) &&
                        <Entry term='Created by'>
                            {forecast.handle}
                        </Entry>
                    }
                </Metadata>
                <Overlay show={showCalendar} placement='bottom' shouldUpdatePosition target={() => findDOMNode(this.refs.target)}>
                    <div style={{position: 'absolute'}}>
                        <Callout placement={BOTTOM}>
                            <DayPicker
                                initialMonth={date}
                                selectedDays={day => moment(day).isSame(date, 'day')}
                                disabledDays={day => moment(day).isAfter(today, 'day')}
                                onDayClick={this.handleDayClick} />
                        </Callout>
                    </div>
                </Overlay>
                {isLoading &&
                    <Loading>
                        Loading weather forecast for <DateElement value={date} />...
                    </Loading>
                }
                {(!isLoading && !forecast) &&
                    <Muted hide={isLoading || !forecast}>
                        No weather forecast available for <DateElement value={date} />.
                    </Muted>
                }
                {forecast && <Forecast isAuthenticated={isAuthenticated} forecast={forecast} />}
            </Article>
        )
    }
}
