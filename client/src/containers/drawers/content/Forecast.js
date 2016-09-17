import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Header, Content, Body} from 'components/page/drawer'
import Forecast, {Metadata} from 'components/forecast'
import {Muted, Error} from 'components/misc'
import {forecast} from 'containers/connectors'

Container.propTypes = {
    type: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    forecast: PropTypes.object,
    region: PropTypes.object,
}

function Container({
    isLoading,
    isLoaded,
    isError,
    forecast,
    type,
    title = 'Loading...',
    link,
}) {
    return (
        <Content>
            <Header subject='Avalanche Forecast'>
                <h1>
                    {link ? <Link {...link}>{title}</Link> : title}
                </h1>
                {forecast && <Metadata {...forecast} />}
            </Header>
            <Body>
                {isLoading && <Muted>Loading forecast...</Muted>}
                {isError && <Error>Error happened while loading forecast.</Error>}
                {(isLoaded && !forecast) && (
                    <Muted>
                        Forecast is available at <Link {...link}>{title}</Link>.
                    </Muted>
                )}
                {forecast && <Forecast {...forecast} />}
            </Body>
        </Content>
    )
}

export default forecast(Container)
