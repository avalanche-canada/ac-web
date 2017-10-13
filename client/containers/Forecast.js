import React from 'react'
import PropTypes from 'prop-types'
import { Page, Header, Main, Content, Aside } from '~/components/page'
import Forecast, {
    Metadata,
    Sidebar,
    KananaskisSidebar,
} from '~/components/forecast'
import { SPAW } from '~/components/misc'
import { Muted, Error } from '~/components/text'
import { forecast } from '~/containers/connectors'

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
    name: PropTypes.string,
    specialWarningLink: PropTypes.object,
    specialWarningContent: PropTypes.string,
}

function Container({
    title = 'Loading...',
    forecast,
    isLoading,
    isError,
    isUnderSpecialWarning,
    specialWarningLink,
    specialWarningContent,
}) {
    const isKananaskis = name === 'kananaskis'
    const isPrintable = forecast ? !forecast.isArchived : false

    // TODO: Huge hack, please FIXME!!!
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
                    {isError &&
                        <Error>
                            Error happened while loading avalanche bulletin.
                        </Error>}
                    {isUnderSpecialWarning &&
                        <SPAW link={specialWarningLink} style={SPAW_STYLE}>
                            {specialWarningContent}
                        </SPAW>}
                    {forecast && forecast.region && <Forecast {...forecast} />}
                </Main>
                <Aside>
                    {isKananaskis
                        ? <KananaskisSidebar />
                        : <Sidebar isPrintable={isPrintable} />}
                </Aside>
            </Content>
        </Page>
    )
}

export default forecast(Container)
