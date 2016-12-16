import React, {PropTypes, Component} from 'react'
import {withRouter} from 'react-router'
import {loadForType} from 'actions/prismic'
import {connect} from 'react-redux'
import {Article} from 'components/page'
import {DateElement, Time, Loading, Muted, Error} from 'components/misc'
import {Metadata, Entry} from 'components/metadata'
import Forecast from 'components/weather'
import {Predicates} from 'prismic'
import {getForecast} from 'selectors/prismic/weather'
import {DayPicker} from 'components/controls'
import {formatAsDay, parseFromDay} from 'utils/date'

const STYLE = {
    position: 'relative',
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
        isError: false,
    }
    set isError(isError) {
        this.setState({isError})
    }
    handleDayChange = date => {
        const {router, type} = this.props

        router.push(`/${type.split('-').join('/')}/${formatAsDay(date)}`)
    }
    componentDidMount() {
        this.load()
    }
    componentWillReceiveProps({params}) {
        if (params.date !== this.props.params.date) {
            this.load(params.date)
        }
    }
    load(date) {
        const {type, params} = this.props

        if (!date) {
            date = params.date || new Date()
        }

        if (date instanceof Date) {
            date = formatAsDay(date)
        }

        const options = {
            predicates: [Predicates.at(`my.${type}.date`, date)]
        }

        this.isError = false

        this.props.loadForType(type, options).catch(err => {
            this.isError = true
        })
    }
    render() {
        const {params, isAuthenticated, forecast, isLoading} = this.props
        const {isError} = this.state
        let {date} = params

        date = date ? parseFromDay(date) : new Date()

        return (
            <Article style={STYLE}>
                <Metadata>
                    <Entry term='Date'>
                        <DayPicker date={date} onChange={this.handleDayChange} container={this} >
                            <DateElement value={date} />
                        </DayPicker>
                    </Entry>
                    {(forecast && forecast.issued) &&
                        <Entry term='Issued at'>
                            <Time value={forecast.issued} />
                        </Entry>
                    }
                    {(forecast && forecast.handle) &&
                        <Entry term='Created by'>
                            {forecast.handle}
                        </Entry>
                    }
                </Metadata>
                {isLoading &&
                    <Loading>
                        Loading weather forecast for <DateElement value={date} />...
                    </Loading>
                }
                {(!isLoading && !isError && !forecast) &&
                    <Muted>
                        No weather forecast available for <DateElement value={date} />.
                    </Muted>
                }
                {isError &&
                    <Error>
                        Error happened to load weather forecast for <DateElement value={date} />.
                    </Error>
                }
                {forecast && <Forecast isAuthenticated={isAuthenticated} forecast={forecast} />}
            </Article>
        )
    }
}
