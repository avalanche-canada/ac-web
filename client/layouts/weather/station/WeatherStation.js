import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Page, Content, Header, Main } from 'components/page'
import { Metadata, Station, Footer } from 'components/weather/station'
import { Status } from 'components/misc'
import WeatherStationContainer from 'containers/WeatherStation'
import * as utils from 'utils/station'

export default class WeatherStation extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }
    children = ({ entity, status }) => [
        <Header title={utils.title(entity, status)} />,
        <Content>
            <Main>
                {Metadata.render(entity)}
                <Status {...status} />
                {Station.render(entity)}
                <Footer />
            </Main>
        </Content>,
    ]
    render() {
        return (
            <Page>
                <WeatherStationContainer id={this.props.id}>
                    {this.children}
                </WeatherStationContainer>
            </Page>
        )
    }
}
