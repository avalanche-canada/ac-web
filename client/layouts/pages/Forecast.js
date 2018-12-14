import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import isToday from 'date-fns/is_today'
import { Forecast } from 'containers/forecast'
import { Region, Regions } from 'containers/features'
import { Page, Header, Content, Main, Aside } from 'components/page'
import { Muted, Loading, Warning } from 'components/text'
import { Pending, Fulfilled } from 'components/fetch'
import * as components from 'layouts/products/forecast'
import { SPAW as SPAWComponent } from 'components/misc'
import { Region as SPAW } from 'layouts/SPAW'
import { List, ListItem } from 'components/page'

export default class ForecastLayout extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
    }
    renderSPAW = ({ document }) => {
        const { link, description } = document.data
        const style = {
            marginTop: '1em',
            padding: '1em',
        }

        return (
            <SPAWComponent link={link} style={style}>
                <p>{description[0].text} Click for more information.</p>
            </SPAWComponent>
        )
    }
    renderHeader = ({ pending, data }) => (
        <Header
            title={
                pending ? (
                    <Loading component="span" />
                ) : (
                    data?.name || (
                        <Warning component="span">
                            {this.props.name} forecast not found
                        </Warning>
                    )
                )
            }
        />
    )
    renderForecast = props => {
        const { name } = this.props

        return (
            <Fragment>
                <Pending>
                    <Muted>Loading forecast data...</Muted>
                </Pending>
                <Fulfilled.Found>
                    <components.Forecast value={props.data}>
                        <components.Metadata />
                        <SPAW name={name}>{this.renderSPAW}</SPAW>
                        <components.Headline />
                        <components.TabSet />
                        <components.Footer />
                    </components.Forecast>
                </Fulfilled.Found>
                <Fulfilled.NotFound>
                    <Regions>{renderRegions}</Regions>
                </Fulfilled.NotFound>
            </Fragment>
        )
    }
    render() {
        const { name, date } = this.props
        const isPrintable = !date || isToday(date)

        return (
            <Page>
                <Region name={name}>{this.renderHeader}</Region>
                <Content>
                    <Main>
                        <Forecast name={name} date={date}>
                            {this.renderForecast}
                        </Forecast>
                    </Main>
                    <Aside>
                        {name === 'kananaskis' ? (
                            <components.KananaskisSidebar />
                        ) : (
                            <components.Sidebar isPrintable={isPrintable} />
                        )}
                    </Aside>
                </Content>
            </Page>
        )
    }
}

// Utils
function renderRegions({ fulfilled, data }) {
    return fulfilled ? (
        <Fragment>
            <h3>Click on a link below to see another forecast:</h3>
            <List column={1}>
                {data.map(({ id, name }) => (
                    <ListItem key={id} to={`../${id}`} replace>
                        {name}
                    </ListItem>
                ))}
            </List>
        </Fragment>
    ) : null
}
