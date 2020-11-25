import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isToday from 'date-fns/is_today'
import { Link, Redirect } from '@reach/router'
import { FormattedMessage } from 'react-intl'
import { useForecast } from 'hooks/async/api/products'
import { Header, Content, Main, Aside } from 'components/page'
import { Page } from 'layouts/pages'
import * as ForecastRegionList from 'layouts/pages/ForecastRegionList'
import * as Components from 'layouts/products/forecast'
import { handleForecastTabActivate } from 'services/analytics'
import { Tag } from 'layouts/SPAW'
import shim from 'components/Shim.module.css'
import * as Async from 'contexts/async'
import { Details } from 'components/error'
import { Loading, Warning } from 'components/text'

ForecastLayout.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
}

export default function ForecastLayout({ name, date }) {
    const isPrintable = !date || isToday(date)

    return (
        <Page>
            <Async.Provider value={useForecast(name)}>
                <Header title={<Title name={name} />} />
                <Content>
                    <Main>
                        <Async.Pending>
                            <Loading>
                                <FormattedMessage
                                    description="Layout pages/Forecast"
                                    defaultMessage="Loading forecast..."
                                />
                            </Loading>
                        </Async.Pending>
                        <Async.Found>
                            <ForecastContent />
                        </Async.Found>
                        <Async.FirstError>
                            <Async.NotFound>
                                <ForecastRegionList.Content />
                            </Async.NotFound>
                            <Async.Error>
                                <Details
                                    summary={
                                        <FormattedMessage
                                            description="Layout pages/Forecast"
                                            defaultMessage="An error happened while loading forecast."
                                        />
                                    }
                                    className={shim.all}
                                />
                            </Async.Error>
                        </Async.FirstError>
                    </Main>
                    <Aside>
                        <Sidebar isPrintable={isPrintable} />
                    </Aside>
                </Content>
            </Async.Provider>
        </Page>
    )
}

// Util components
function Sidebar(props) {
    return (
        <Async.Found>
            {payload => (
                <Components.Provider value={payload}>
                    <Components.Sidebar {...props} />
                </Components.Provider>
            )}
        </Async.Found>
    )
}
function Title({ name }) {
    return (
        <Fragment>
            <Async.Pending>
                <Loading as="span" />
            </Async.Pending>
            <Async.Found>
                <ForecastHeader />
            </Async.Found>
            <Async.Empty>
                <Warning as="span">
                    <FormattedMessage
                        description="Layout pages/Forecast"
                        defaultMessage="{name} forecast not found"
                        values={{ name }}
                    />
                </Warning>
            </Async.Empty>
        </Fragment>
    )
}
function ForecastContent({ payload }) {
    if (payload.owner.isExternal) {
        window.open(payload.url, payload.slug)

        return <Redirect to="/forecasts" />
    }

    return (
        <Components.Provider value={payload}>
            <Async.Found>
                <Components.Metadata />
                <Components.Notifications />
                <Components.Headline />
                <Components.TabSet onTabChange={handleForecastTabActivate} />
                <Components.Footer />
            </Async.Found>
        </Components.Provider>
    )
}

function ForecastHeader({ payload }) {
    const { name, id } = payload.area

    return (
        <Fragment>
            <Tag region={id} as={Link} to="/spaw" />
            {name}
        </Fragment>
    )
}
