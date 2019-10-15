import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isToday from 'date-fns/is_today'
import { useForecast } from 'hooks/forecast'
import {
    useForecastRegionsMetadata,
    useForecastRegionMetadata,
} from 'hooks/features'
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

ForecastLayout.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
}

export default function ForecastLayout(props) {
    const { name, date } = props
    const isPrintable = !date || isToday(date)
    const [region, pending] = useForecastRegionMetadata(name)
    const title = pending ? (
        <Loading component="span" />
    ) : (
        region?.name || (
            <Warning component="span">{name} forecast not found</Warning>
        )
    )

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <ForecastContent {...props} />
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
function ForecastContent({ name, date }) {
    const [forecast, pending] = useForecast(name, date)

    if (pending) {
        return <Muted>Loading forecast data...</Muted>
    }

    return forecast ? (
        <components.Provider value={forecast}>
            <components.Metadata />
            <SPAW name={name} />
            <components.Headline />
            <components.TabSet onTabChange={handleForecastTabActivate} />
            <components.Footer />
        </components.Provider>
    ) : (
        <OtherRegions />
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
