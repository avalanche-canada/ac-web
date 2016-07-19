import React from 'react'
import {connect} from 'react-redux'
import {Header, Content, Body} from 'components/page/drawer'
import Forecast from 'components/forecast'
import {compose, lifecycle} from 'recompose'
import {getForecast} from 'selectors/forecast'
import {loadForecast} from 'actions/entities'
import {Muted} from 'components/misc'

function Container({isLoading, forecast, title = 'South Columbia'}) {
    return (
        <Content>
            <Header subject='Avalanche Forecast'>
                <h1>{title}</h1>
            </Header>
            <Body>
                {isLoading ?
                    <Muted>
                        Loading forecast...
                    </Muted> :
                    <Forecast {...forecast} />
                }
            </Body>
        </Content>
    )
}

export default compose(
    connect(getForecast, {loadForecast}),
    lifecycle({
        componentDidMount() {
            const {loadForecast, params} = this.props

            loadForecast(params)
        },
        componentWillReceiveProps({params}) {
            this.props.loadForecast(params)
        },
    })
)(Container)
