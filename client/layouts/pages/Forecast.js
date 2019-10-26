import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isToday from 'date-fns/is_today'
import { useForecast } from 'hooks/async/forecast'
import {
    useForecastRegionsMetadata,
    useForecastRegionMetadata,
} from 'hooks/async/features'
import {
    Page,
    Header,
    Content,
    Main,
    Aside,
    List,
    ListItem,
} from 'components/page'
import { Muted, Loading, Warning } from 'components/text'
import * as components from 'layouts/products/forecast'
import { handleForecastTabActivate } from 'services/analytics'
import { Region as SPAWContainer, Alert as SPAWComponent } from 'layouts/SPAW'
import { StructuredText } from 'prismic/components/base'
import Shim from 'components/Shim'
import { useMerge } from 'hooks/async'

ForecastLayout.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
}

export default function ForecastLayout(props) {
    const { name, date } = props
    const isPrintable = !date || isToday(date)
    const [[region, forecast], pending, [, error]] = useMerge(
        useForecastRegionMetadata(name),
        useForecast(name, date)
    )
    const title = pending ? (
        <Loading component="span" />
    ) : region ? (
        region.name
    ) : (
        <Warning component="span">{name} forecast not found</Warning>
    )

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {pending && <Muted>Loading forecast data...</Muted>}
                    {forecast && <ForecastContent value={forecast} />}
                    {error && <OtherRegions />}
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
function ForecastContent({ value }) {
    return (
        <components.Provider value={value}>
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
            {({ document }) => {
                const { link, description } = document.data

                return (
                    <Shim top>
                        <SPAWComponent link={link}>
                            <StructuredText value={description} />
                        </SPAWComponent>
                    </Shim>
                )
            }}
        </SPAWContainer>
    )
}
