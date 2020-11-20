import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isToday from 'date-fns/is_today'
import { Link, Redirect } from '@reach/router'
import { FormattedMessage } from 'react-intl'
import { useForecasts, useForecast } from 'hooks/async/api/products'
import { Header, Content, Main, Aside, List, ListItem } from 'components/page'
import { Page } from 'layouts/pages'
import * as Components from 'layouts/products/forecast'
import { handleForecastTabActivate } from 'services/analytics'
import { Tag } from 'layouts/SPAW'
import shim from 'components/Shim.css'
import * as Async from 'contexts/async'
import { Details } from 'components/error'
import { Loading } from 'components/text'
import typography from 'components/text/Text.css'

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
                            <p className={typography.Muted}>
                                <FormattedMessage
                                    description="Layout pages/Forecast"
                                    defaultMessage="Loading forecast..."
                                />
                            </p>
                        </Async.Pending>
                        <Async.Found>
                            <ForecastContent />
                        </Async.Found>
                        <Async.FirstError>
                            <Async.NotFound>
                                <OtherRegions />
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
                <span className={typography.Warning}>
                    <FormattedMessage
                        description="Layout pages/Forecast"
                        defaultMessage="{name} forecast not found"
                        values={{ name }}
                    />
                </span>
            </Async.Empty>
        </Fragment>
    )
}
function ForecastContent({ payload }) {
    if (payload.owner.isExternal) {
        open(payload.url, payload.slug)

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
function OtherRegions() {
    const [forecasts] = useForecasts()

    return (
        <Fragment>
            <h3>
                <FormattedMessage
                    description="Layout pages/Forecast"
                    defaultMessage="Click on a link below to see another forecast:"
                />
            </h3>
            <List column={1}>
                {forecasts.map(({ area: { id, name } }) => (
                    <ListItem key={id} to={`../${id}`} replace>
                        {name}
                    </ListItem>
                ))}
            </List>
        </Fragment>
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
