import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {
    Navbar,
    Header,
    Container as DrawerContainer,
    Body,
    Close,
} from '~/components/page/drawer'
import { Loading, Error } from '~/components/misc'
import { hotZoneReport } from '~/containers/connectors'
import HotZoneReport, { Metadata } from '~/components/hotZoneReport'
import Sponsor from '~/layouts/Sponsor'
import { LocateAsClass } from '~/components/button/Locate'
import { Wrapper } from '~/components/tooltip'

const LOCATE_STYLE = {
    padding: '0.15em',
}
const ARROW_STYLE = {
    left: 'calc(50% + 7px)',
}

Container.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    report: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    shareUrl: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

function Container({
    isLoading,
    isError,
    report,
    title = 'Loading...',
    link,
    shareUrl,
    onCloseClick,
    onLocateClick,
}) {
    return (
        <DrawerContainer>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject="Hot Zone Report">
                <h1>
                    {link ? <Link to={link}>{title}</Link> : title}
                    {isLoading ||
                        <Wrapper
                            tooltip="Display on map"
                            arrowStyle={ARROW_STYLE}>
                            <LocateAsClass
                                onClick={onLocateClick}
                                style={LOCATE_STYLE}
                            />
                        </Wrapper>}
                </h1>
                {report && <Metadata report={report} shareUrl={shareUrl} />}
            </Header>
            <Body>
                {isLoading &&
                    <Loading>Loading {title} hot zone report...</Loading>}
                {isError &&
                    <Error>
                        An error happened while loading hot zone report.
                    </Error>}
                {isLoading || <HotZoneReport report={report} />}
            </Body>
        </DrawerContainer>
    )
}

export default hotZoneReport(Container)
