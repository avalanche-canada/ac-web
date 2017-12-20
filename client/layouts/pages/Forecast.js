import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import isToday from 'date-fns/is_today'
import Container from 'containers/Forecast'
import { Page, Header, Main, Content, Aside } from 'components/page'
import { Status } from 'components/misc'
import { StructuredText } from 'prismic/components/base'
import Forecast, {
    Metadata,
    Sidebar,
    KananaskisSidebar,
} from 'components/forecast'
import { SPAW as SPAWComponent } from 'components/misc'
import { Region as SPAW } from 'layouts/SPAW'

export default class ForecastLayout extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
    }
    renderSPAW = ({ document }) => {
        const { link, description } = document
        const style = {
            display: 'block',
            marginTop: '1em',
        }

        return (
            <SPAWComponent link={link} style={style}>
                <StructuredText value={description} />
            </SPAWComponent>
        )
    }
    renderHeader(region, forecast, status) {
        let title = status.messages.isLoading

        if (forecast) {
            title = forecast.get('bulletinTitle')
        } else if (region) {
            title = region.get('name')
        }

        return <Header title={title} />
    }
    sidebar = ({ match }) => {
        const { name, date } = match.params

        if (name === 'kananaskis') {
            return <KananaskisSidebar />
        }

        const isPrintable = !date || isToday(date)

        return <Sidebar isPrintable={isPrintable} />
    }
    children = ({ forecast, region, status }) => [
        this.renderHeader(region, forecast, status),
        <Content>
            <Main>
                <Status {...status} />
                {forecast && Metadata.render(forecast)}
                <SPAW name={this.props.name}>{this.renderSPAW}</SPAW>
                {forecast && Forecast.render(forecast)}
            </Main>
            <Aside>
                <Route>{this.sidebar}</Route>
            </Aside>
        </Content>,
    ]
    render() {
        const { name, date } = this.props

        return (
            <Page>
                <Container name={name} date={date}>
                    {this.children}
                </Container>
            </Page>
        )
    }
}
