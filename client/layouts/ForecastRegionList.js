import React from 'react'
import { useForecasts } from 'hooks/async/api/products'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'
import { Layout } from 'layouts/pages'
import * as Async from 'contexts/async'

export default function ForecastRegionList() {
    return (
        <Async.Provider value={useForecasts()}>
            <Layout
                title="Forecast regions"
                headline="Click on a link below to read the avalanche forecast.">
                <Async.Pending>
                    <Loading />
                </Async.Pending>
                <Async.Found>
                    {forecasts => (
                        <List>
                            {forecasts.map(forecast => {
                                const { slug, report } = forecast

                                return (
                                    <ListItem key={slug} to={slug}>
                                        {report.title}
                                    </ListItem>
                                )
                            })}
                        </List>
                    )}
                </Async.Found>
            </Layout>
        </Async.Provider>
    )
}
