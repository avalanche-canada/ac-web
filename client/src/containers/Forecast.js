import React, {PropTypes, createElement} from 'react'
import {Link} from 'react-router'
import {Page, Header, Main} from 'components/page'
import Forecast, {Metadata} from 'components/forecast'
import {Muted, Error} from 'components/misc'
import {forecast} from './connectors'

Container.propTypes = {
    type: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    forecast: PropTypes.object,
    region: PropTypes.object,
}

function Container({isLoading, forecast, type, title = 'Loading...', isError, link, isArchive = false}) {
    return (
        <Page>
            <Header title={link ? <Link {...link}>{title}</Link> : title} />
            <Main>
                {forecast && <Metadata {...forecast} />}
                {isLoading && <Muted>Loading forecast...</Muted>}
                {isError && <Error>Error happened while loading forecast.</Error>}
                {(forecast && forecast.region) && createElement(Forecast, forecast)}
            </Main>
        </Page>
    )
}

export default forecast(Container)
