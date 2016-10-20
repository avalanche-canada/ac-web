import React from 'react'
import {Link} from 'react-router'
import {Navbar, Header, Container as DrawerContainer, Body, Close} from 'components/page/drawer'
import {Loading, Error} from 'components/misc'
import {hotZoneReport} from 'containers/connectors'
import HotZoneReport, {Metadata} from 'components/hotZoneReport'
import Sponsor from 'containers/Sponsor'

function Container({
    isLoading,
    report = {},
    params,
    title = 'Loading...',
    isError,
    link,
    onCloseClick,
}) {
    return (
        <DrawerContainer>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject='Hot Zone Report'>
                <h1>{link ? <Link to={link}>{title}</Link> : title}</h1>
                {isLoading || <Metadata report={report.report} />}
            </Header>
            <Body>
                {isLoading && <Loading>Loading hot zone report...</Loading>}
                {isError && <Error>An error happened!!!</Error>}
                {isLoading || <HotZoneReport report={report.report} />}
            </Body>
        </DrawerContainer>
    )
}

export default hotZoneReport(Container)
