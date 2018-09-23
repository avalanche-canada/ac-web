import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import isToday from 'date-fns/is_today'
import { Forecast } from 'containers/forecast'
import { Region } from 'containers/features'
import { Page, Header, Content, Main, Aside } from 'components/page'
import { Muted } from 'components/text'
import Fetch from 'components/fetch'
import { StructuredText } from 'prismic/components/base'
import * as components from 'layouts/products/forecast'
import { SPAW as SPAWComponent } from 'components/misc'
import { Region as SPAW } from 'layouts/SPAW'

export default class ForecastLayout extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
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
    renderHeader({ loading, data }) {
        return <Header title={loading || !data ? 'Loading...' : data.name} />
    }
    children = props => {
        const { name, date } = this.props
        const isPrintable = !date || isToday(date)

        return (
            <Fragment>
                <Region name={name}>{this.renderHeader}</Region>
                <Content>
                    <Main>
                        <components.Forecast value={props.data}>
                            <components.Metadata />
                            <Fetch.Loading>
                                <Muted>Loading forecast data...</Muted>
                            </Fetch.Loading>
                            <SPAW name={name}>{this.renderSPAW}</SPAW>
                            <components.Headline />
                            <components.TabSet />
                            <components.Footer />
                        </components.Forecast>
                    </Main>
                    <Aside>
                        {name === 'kananaskis' ? (
                            <components.KananaskisSidebar />
                        ) : (
                            <components.Sidebar isPrintable={isPrintable} />
                        )}
                    </Aside>
                </Content>
            </Fragment>
        )
    }
    render() {
        const { name, date } = this.props

        return (
            <Page>
                <Forecast name={name} date={date}>
                    {this.children}
                </Forecast>
            </Page>
        )
    }
}
