import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Page, Header, Main, Content, Aside} from 'components/page'
import Forecast, {Metadata, Sidebar, KananaskisSidebar} from 'components/forecast'
import {Muted, Error} from 'components/misc'
import {forecast} from 'containers/connectors'

Container.propTypes = {
    title: PropTypes.string.isRequired,
    forecast: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
}

function Container({
    title = 'Loading...',
    forecast,
    isLoading,
    isError,
    params,
}) {
    const isKananaskis = params.name === 'kananaskis'

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {forecast && <Metadata {...forecast} />}
                    {isLoading && <Muted>Loading forecast...</Muted>}
                    {isError && <Error>Error happened while loading forecast.</Error>}
                    {(forecast && forecast.region) && <Forecast {...forecast} />}
                </Main>
                <Aside>
                    {isKananaskis ? <KananaskisSidebar /> : <Sidebar />}
                </Aside>
            </Content>
        </Page>
    )
}

export default forecast(Container)
