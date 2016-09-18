import React from 'react'
import {Link} from 'react-router'
import {Header, Content, Body} from 'components/page/drawer'
import {Loading, Error} from 'components/misc'
import {hotZoneReport} from 'containers/connectors'
import HotZoneReport, {Metadata} from 'components/hotZoneReport'

function Container({
    isLoading,
    report = {},
    params,
    title = 'Loading...',
    isError,
    link,
}) {
    return (
        <Content>
            <Header subject='Hot Zone Report'>
                <h1>{link ? <Link to={link}>{title}</Link> : title}</h1>
                {report && <Metadata {...report} />}
            </Header>
            <Body>
                {isLoading && <Loading>Loading hot zone report...</Loading>}
                {isError && <Error>An error happened!!!</Error>}
                {isLoading || <HotZoneReport report={report.report} />}
            </Body>
        </Content>
    )
}

export default hotZoneReport(Container)
