import React from 'react'
import {Link} from 'react-router'
import {Navbar, Header, Container as DrawerContainer, Body, Close} from 'components/page/drawer'
import {Loading, Error} from 'components/misc'
import {hotZoneReport} from 'containers/connectors'
import HotZoneReport, {Metadata} from 'components/hotZoneReport'
import Sponsor from 'containers/Sponsor'
import {Locate} from 'components/button'

function Container({
    isLoading,
    report = {},
    params,
    title = 'Loading...',
    isError,
    link,
    onCloseClick,
    onLocateClick,
}) {
    const shareUrl = link && `${window.location.origin}${link.to}`

    return (
        <DrawerContainer>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject='Hot Zone Report'>
                <h1>
                    {link ? <Link to={link}>{title}</Link> : title}
                    <Locate onClick={onLocateClick} />
                </h1>
                {isLoading ||
                    <Metadata report={report.report} shareUrl={shareUrl} />
                }
            </Header>
            <Body>
                {isLoading &&
                    <Loading>Loading hot {title} zone report...</Loading>
                }
                {isError &&
                    <Error>An error happened while loading hot zone report.</Error>
                }
                {isLoading ||
                    <HotZoneReport report={report.report} />
                }
            </Body>
        </DrawerContainer>
    )
}

export default hotZoneReport(Container)
