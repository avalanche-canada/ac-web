import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isToday from 'date-fns/is_today'
import { useForecast } from 'hooks/async/forecast'
import {
    useForecastRegionsMetadata,
    useForecastRegionMetadata,
} from 'hooks/async/features'
import { Header, Content, Main, Aside, List, ListItem } from 'components/page'
import { Page } from 'layouts/pages'
import * as components from 'layouts/products/forecast'
import { handleForecastTabActivate } from 'services/analytics'
import { Region as SPAWContainer, Alert as SPAWComponent } from 'layouts/SPAW'
import Shim from 'components/Shim'
import shim from 'components/Shim.css'
import * as Async from 'contexts/async'
import typography from 'components/text/Text.css'
import { Details } from 'components/error'

ForecastLayout.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
}

export default function ForecastLayout({ name, date }) {
    const isPrintable = !date || isToday(date)

    return (
        <Page>
            <Async.Provider value={useForecastRegionMetadata(name)}>
                <Header title={<Title name={name} />} />
            </Async.Provider>
            <Content>
                <Main>
                    <Async.Provider value={useForecast(name, date)}>
                        <Async.Pending>
                            <p className={typography.Muted}>
                                Loading forecast...
                            </p>
                        </Async.Pending>
                        <Async.Found>
                            <ForecastContent name={name} />
                        </Async.Found>
                        <Async.FirstError>
                            <Async.NotFound>
                                <OtherRegions />
                            </Async.NotFound>
                            <Async.Error>
                                <Details
                                    summary="An error happened while loading forecast."
                                    className={shim.all}
                                />
                            </Async.Error>
                        </Async.FirstError>
                    </Async.Provider>
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

// Util components
function Title({ name }) {
    return (
        <Fragment>
            <Async.Pending>
                <span className={typography.Muted}>Loading...</span>
            </Async.Pending>
            <Async.Found>{region => region.name}</Async.Found>
            <Async.Empty>
                <span className={typography.Warning}>
                    {name} forecast not found
                </span>
            </Async.Empty>
        </Fragment>
    )
}
function ForecastContent({ name, payload }) {
    return (
        <components.Provider value={payload}>
            <components.Metadata />
            <SPAW name={name} />
            <components.Headline />
            <components.TabSet onTabChange={handleForecastTabActivate} />
            <components.Footer />
        </components.Provider>
    )
}
function OtherRegions() {
    const [regions] = useForecastRegionsMetadata()

    return (
        <Fragment>
            <h3>Click on a link below to see another forecast:</h3>
            <List column={1}>
                {regions.map(({ id, name }) => (
                    <ListItem key={id} to={`../${id}`} replace>
                        {name}
                    </ListItem>
                ))}
            </List>
        </Fragment>
    )
}
function SPAW({ name }) {
    return (
        <SPAWContainer name={name}>
            <Shim top>
                <SPAWComponent linkable />
            </Shim>
        </SPAWContainer>
    )
}
