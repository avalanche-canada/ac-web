import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { Page, Header, Main, Content, Aside } from '~/components/page'
import { Muted, Error } from '~/components/misc'
import { Item } from '~/components/sidebar'
import { hotZoneReport } from '~/containers/connectors'
import HotZoneReport, { Metadata, Sidebar } from '~/components/hotZoneReport'

Container.propTypes = {
    title: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    report: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    shareUrl: PropTypes.string,
}

function Container({
    title = 'Loading...',
    report,
    isLoading,
    isError,
    shareUrl,
    region,
}) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {isLoading || <Metadata report={report} />}
                    {isLoading && <Muted>Loading hot zone report...</Muted>}
                    {isError &&
                        <Error>Error happened while loading report.</Error>}
                    {isLoading || <HotZoneReport report={report} />}
                </Main>
                <Aside>
                    <Sidebar shareUrl={shareUrl}>
                        <Item>
                            <Link to={`/map/hot-zone-reports/${region}`}>
                                See that report on the main map
                            </Link>
                        </Item>
                    </Sidebar>
                </Aside>
            </Content>
        </Page>
    )
}

export default hotZoneReport(Container)
