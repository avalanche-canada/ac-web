import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Page, Header, Main, Content, Aside} from 'components/page'
import Forecast, {Metadata, Sidebar, KananaskisSidebar} from 'components/forecast'
import {Muted, Error, SPAW, InnerHTML} from 'components/misc'
import {forecast} from 'containers/connectors'

const SPAW_STYLE = {
    padding: '1em',
    marginTop: '1em',
}

Container.propTypes = {
    title: PropTypes.string.isRequired,
    forecast: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    isUnderSpecialWarning: PropTypes.bool,
    specialWarningLink: PropTypes.object,
}

function Container({
    title = 'Loading...',
    forecast,
    isLoading,
    isError,
    params,
    isUnderSpecialWarning,
    specialWarningLink,
    specialWarningContent,
}) {
    const isKananaskis = params.name === 'kananaskis'
    // TODO: Hack, to be fixed!!!
    if (specialWarningContent) {
        specialWarningContent = specialWarningContent.replace('<p>', '')
        specialWarningContent = specialWarningContent.replace('&amp;', '&')
        specialWarningContent = specialWarningContent.split(' - ')[0]
    }

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {forecast && <Metadata {...forecast} />}
                    {isLoading && <Muted>Loading avalanche bulletin...</Muted>}
                    {isError && <Error>Error happened while loading avalanche bulletin.</Error>}
                    {isUnderSpecialWarning &&
                        <SPAW link={specialWarningLink} style={SPAW_STYLE}>
                            {specialWarningContent}
                        </SPAW>}
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
