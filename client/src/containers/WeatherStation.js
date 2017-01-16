import React, {PropTypes} from 'react'
import {Page, Content, Header, Main} from 'components/page'
import {Metadata, Station} from 'components/weather/station'
import {Status} from 'components/misc'
import {weatherStation} from 'containers/connectors'
import Sponsor from 'containers/Sponsor'

function WeatherStation({
    title,
    status,
    station,
    measurements,
    columns,
    headers,
    rows,
    onCloseClick,
}) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Status {...status.toJSON()} />
                    {station && <Metadata {...station} />}
                    {station &&
                        <Station {...station} columns={columns} measurements={measurements} headers={headers} />
                    }
                </Main>
            </Content>
        </Page>
    )
}

export default weatherStation(WeatherStation)
