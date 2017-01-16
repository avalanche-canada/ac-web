import React, {PropTypes} from 'react'
import {Header, Container, Body, Navbar, Close} from 'components/page/drawer'
import {Metadata, Station} from 'components/weather/station'
import {Status} from 'components/misc'
import {LocateAsClass} from 'components/button/Locate'
import {Link} from 'react-router'
import {weatherStation} from 'containers/connectors'
import Sponsor from 'containers/Sponsor'
import {Wrapper} from 'components/tooltip'

const LOCATE_STYLE = {
    padding: '0.15em'
}

function WeatherStation({
    title,
    status,
    station,
    measurements,
    columns,
    rows,
    link,
    headers,
    onCloseClick,
    onLocateClick,
}) {
    return (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject='Weather station'>
                <h1>
                    {link ? <Link to={link}>{title}</Link> : title}
                    {status.isLoading ||
                    <Wrapper tooltip='Display on map'>
                        <LocateAsClass onClick={onLocateClick} style={LOCATE_STYLE} />
                    </Wrapper>
                    }
                </h1>
                {station && <Metadata {...station} />}
            </Header>
            <Body>
                <Status {...status.toJSON()} />
                {station &&
                    <Station {...station} columns={columns} measurements={measurements} headers={headers} />
                }
            </Body>
        </Container>
    )
}

export default weatherStation(WeatherStation)
