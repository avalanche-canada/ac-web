import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Page, Header, Main, Content, Headline} from 'components/page'
import {Muted, Error} from 'components/misc'
import {hotZoneReport} from 'containers/connectors'
import HotZoneReport, {Metadata} from 'components/hotZoneReport'

Container.propTypes = {
    title: PropTypes.string.isRequired,
    report: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
}

function Container({
    title = 'Loading...',
    report = {},
    isLoading,
    isError,
}) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {isLoading || <Metadata report={report.report} />}
                    {isLoading && <Muted>Loading report...</Muted>}
                    {isError && <Error>Error happened while loading report.</Error>}
                    {isLoading || <HotZoneReport report={report.report} />}
                </Main>
            </Content>
        </Page>
    )
}

export default hotZoneReport(Container)
