import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
    Navbar,
    Header,
    Container as DrawerContainer,
    Body,
    Close,
} from 'components/page/drawer'
import Forecast, { Metadata } from 'components/forecast'
import { SPAW } from 'components/misc'
import { Muted, Error } from 'components/text'
import { forecast } from 'containers/connectors'
import Sponsor from 'layouts/Sponsor'
import { Feed } from 'containers/feed'
import DisplayOnMap from './DisplayOnMap'

Container.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    isUnderSpecialWarning: PropTypes.bool.isRequired,
    specialWarningLink: PropTypes.string,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    forecast: PropTypes.object,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

const isUnderSpecialWarningStyle = {
    justifyContent: 'space-between',
}

function Container({
    isLoading,
    isLoaded,
    isError,
    isUnderSpecialWarning,
    specialWarningLink,
    forecast,
    title = 'Loading...',
    link,
    onCloseClick,
    onLocateClick,
}) {
    const shareUrl = link && `${window.location.origin}${link.to}`

    return (
        <DrawerContainer>
            <Navbar style={isUnderSpecialWarning && isUnderSpecialWarningStyle}>
                {isUnderSpecialWarning && <SPAW link={specialWarningLink} />}
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject="Avalanche Forecast">
                <h1>
                    {link ? <Link {...link}>{title}</Link> : title}
                    {isLoading || <DisplayOnMap onClick={onLocateClick} />}
                </h1>
            </Header>
            <Body>
                {forecast && <Metadata {...forecast} shareUrl={shareUrl} />}
                {isLoading && <Muted>Loading avalanche bulletin...</Muted>}
                {isError && (
                    <Error>
                        Error happened while loading avalanche bulletin.
                    </Error>
                )}
                {isLoaded &&
                    !forecast && (
                        // TODO: Should explicit defined by a <Route path='/forecasts/north-rockies'>
                        <Feed type="blog" category="north-rockies" />
                    )}
                {forecast && <Forecast {...forecast} />}
            </Body>
        </DrawerContainer>
    )
}

export default forecast(Container)
