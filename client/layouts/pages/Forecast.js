import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import isToday from 'date-fns/is_today'
import Container from 'containers/Forecast'
import { Page, Header, Content, Main, Aside } from 'components/page'
import { Status } from 'components/misc'
import { StructuredText } from 'prismic/components/base'
import { Sidebar, KananaskisSidebar } from 'components/forecast'
import {
    Forecast,
    Metadata,
    ArchiveWarning,
    Headline,
    TabSet,
    Footer,
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
            padding: '1em',
        }

        return (
            <SPAWComponent link={link} style={style}>
                <StructuredText value={description} />
                {link && <p> Click for more information.</p>}
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

        return name === 'kananaskis' ? (
            <KananaskisSidebar />
        ) : (
            <Sidebar isPrintable={!date || isToday(date)} />
        )
    }
    children = ({ forecast, region, status }) => (
        <Fragment>
            {this.renderHeader(region, forecast, status)}
            <Content>
                <Main>
                    <Forecast value={forecast && forecast.toJSON()}>
                        <Metadata />
                        <Status {...status} />
                        <SPAW name={this.props.name}>{this.renderSPAW}</SPAW>
                        <ArchiveWarning />
                        <Headline />
                        <TabSet />
                        <Footer />
                    </Forecast>
                </Main>
                <Aside>
                    <Route>{this.sidebar}</Route>
                </Aside>
            </Content>
        </Fragment>
    )
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
