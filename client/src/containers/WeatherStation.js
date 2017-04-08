import React from 'react'
import PropTypes from 'prop-types'
import {Page, Content, Header, Main} from 'components/page'
import {Metadata, Station} from 'components/weather/station'
import {Status} from 'components/misc'
import {weatherStation} from 'containers/connectors'
import Sponsor from 'containers/Sponsor'
import {Generic} from 'prismic/components'

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
                    <Generic uid='weather-station-disclaimer' />
                </Main>
            </Content>
        </Page>
    )
}

export default weatherStation(WeatherStation)
