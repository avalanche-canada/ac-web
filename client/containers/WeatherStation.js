import React from 'react'
import PropTypes from 'prop-types'
import { Page, Content, Header, Main } from 'components/page'
import { Metadata, Station, Footer } from 'components/weather/station'
import { Status } from 'components/misc'
import { weatherStation } from 'containers/connectors'

WeatherStation.propTypes = {
    title: PropTypes.string.isRequired,
    // TODO: Create a prop type for status
    status: PropTypes.object.isRequired,
    station: PropTypes.object,
    measurements: PropTypes.arrayOf(PropTypes.object),
    // TODO: Create a prop type for column
    columns: PropTypes.arrayOf(PropTypes.object),
    headers: PropTypes.arrayOf(PropTypes.object),
}

function WeatherStation({
    title,
    status,
    station,
    measurements,
    columns,
    headers,
}) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Status {...status.toJSON()} />
                    {station && <Metadata {...station} />}
                    {station &&
                        <Station
                            {...station}
                            columns={columns}
                            measurements={measurements}
                            headers={headers}
                        />}
                    <Footer />
                </Main>
            </Content>
        </Page>
    )
}

export default weatherStation(WeatherStation)
