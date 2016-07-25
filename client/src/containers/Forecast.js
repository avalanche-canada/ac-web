import React, {PropTypes, createElement} from 'react'
import {connect} from 'react-redux'
import {Header, Content, Body} from 'components/page/drawer'
import Forecast, {Metadata} from 'components/forecast'
import {compose, lifecycle, setPropTypes, withState, mapProps} from 'recompose'
import getForecast from 'selectors/forecast'
import {loadForecast} from 'actions/entities'
import {Muted, Error} from 'components/misc'

Container.propTypes = {
    type: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    forecast: PropTypes.object,
    region: PropTypes.object,
}

function Container({isLoading, forecast, type, title = 'Loading...', isError}) {
    const externalUrl = forecast && forecast.externalUrl
    if (externalUrl) {
        console.warn('should navigate to', externalUrl)
    }

    return (
        <Content>
            <Header subject='Avalanche Forecast'>
                <h1>{title}</h1>
                {forecast && <Metadata {...forecast} />}
            </Header>
            <Body>
                {isLoading && <Muted>Loading forecast...</Muted>}
                {isError && <Error>Error happened while loading forecast.</Error>}
                {(forecast && forecast.region) && createElement(Forecast, forecast)}
            </Body>
        </Content>
    )
}

export default compose(
    connect(getForecast, {loadForecast}),
    withState('isError', 'setIsError', false),
    mapProps(({loadForecast, setIsError, ...props}) => ({
        ...props,
        load(params) {
            loadForecast(params || props.params).catch(err => setIsError(true))
        },
    })),
    lifecycle({
        componentDidMount() {
            this.props.load()
        },
        componentWillReceiveProps({params}) {
            this.props.load(params)
        },
    }),
)(Container)
