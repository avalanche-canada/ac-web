import React, { PropTypes, Component } from 'react'
import { compose, getContext } from 'recompose'
import { resolve } from 'react-resolver'
import CSSModules from 'react-css-modules'
import moment from 'moment'
import { Pagination, Left, Right, Center } from '../../../components/pagination'
import { Date as DateElement, DateTime, Time } from '../../../components/misc'
import Nav from '../../Nav'
import { Forecast } from '../../../weather'
import styles from '../Weather.css'
import { Query, Api, Predicates } from '../../../prismic'

function fetchForecasts(props) {
    const type = 'new-weather-forecast'
    const after = moment().subtract(1, 'w').toDate()
    const predicates = [
        Predicates.at('document.type', type),
        Predicates.dateAfter(`my.${type}.date`, after),
    ]

    return Api().then(api => (
        api.query(...predicates)
           .orderings(`[my.${type}.date desc]`)
           .submit()
    )).then(res => res.results)
}

@resolve('forecasts', fetchForecasts)
@CSSModules(styles)
export default class Container extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    }
    static defaultProps = {
        isAuthenticated: false
    }
    state = {
        cursor: 0
    }
    constructor(...args) {
        super(...args)

        this.handleNewer = () => {
            this.cursor = this.cursor - 1
        }
        this.handleOlder = () => {
            this.cursor = this.cursor + 1
        }
    }
    set cursor(cursor) {
        this.setState({ cursor })
    }
    get cursor() {
        return this.state.cursor
    }
    get hasNewer() {
        return this.cursor !== 0
    }
    get hasOlder() {
        return this.props.forecasts.length > (this.cursor + 1)
    }
    render() {
        const { forecasts, isAuthenticated } = this.props
        const forecast = forecasts[this.cursor]

        let date = forecast.getDate(`${forecast.type}.date`)
        date = moment(date).add(1, 'd').toDate()
        const issued = forecast.getTimestamp(`${forecast.type}.issued`)
        const handle = forecast.getText(`${forecast.type}.handle`)

        return (
            <div>
                <Nav>
                    <Pagination>
                        <Left onNavigate={this.handleOlder} hidden={!this.hasOlder} />
                        <Center>
                            <h3 styleName='Header'>
                                <DateElement value={date} />
                                <br />
                            <small>
                                Issued at <Time value={issued} /> by <span>{handle}</span>
                            </small>
                            </h3>
                        </Center>
                        <Right onNavigate={this.handleNewer} hidden={!this.hasNewer} />
                    </Pagination>
                </Nav>
                <Forecast isAuthenticated={isAuthenticated} document={forecast} />
            </div>
        )
    }
}
