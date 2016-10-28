import React, {PropTypes} from 'react'
import {Header, Container, Body, Navbar, Close} from 'components/page/drawer'
import {Metadata, Station} from 'components/weather/station'
import {Loading, Error} from 'components/misc'
import {Link} from 'react-router'
import {weatherStation} from 'containers/connectors'
import Sponsor from 'containers/Sponsor'

function WeatherStation({
    title,
    metadata,
    isLoading,
    isError,
    props,
    messages,
    link,
    onCloseClick,
    subject ='Weather station',
}) {
    const {error, loading} = messages

    return (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject={subject}>
                <h1>
                    {link ? <Link to={link}>{title}</Link> : title}
                </h1>
                {metadata && <Metadata {...metadata} />}
            </Header>
            <Body>
                {isError && <Error>{error}</Error>}
                {isLoading && <Loading>{loading}</Loading>}
                {props && <Station {...props} />}
            </Body>
        </Container>
    )
}

export default weatherStation(WeatherStation)
