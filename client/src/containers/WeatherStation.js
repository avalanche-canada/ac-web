import React, {PropTypes} from 'react'
import {Page, Content, Header, Main} from 'components/page'
import {Metadata, Station} from 'components/weather/station'
import {Loading, Error} from 'components/misc'
import {weatherStation} from 'containers/connectors'
import Sponsor from 'containers/Sponsor'

function WeatherStation({
    title,
    isLoading,
    isError,
    station,
    messages,
    measurements,
    columns,
    headers,
    rows,
    onCloseClick,
}) {
    const {error, loading} = messages

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {station && <Metadata {...station} />}
                    {isError && <Error>{error}</Error>}
                    {isLoading && <Loading>{loading}</Loading>}
                    {station &&
                        <Station {...station} columns={columns} measurements={measurements} headers={headers} />
                    }
                </Main>
            </Content>
        </Page>
    )
}

export default weatherStation(WeatherStation)
