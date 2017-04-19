import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {Navbar, Header, Container as DrawerContainer, Body, Close} from '~/components/page/drawer'
import Forecast, {Metadata} from '~/components/forecast'
import {Muted, Error, SPAW} from '~/components/misc'
import {forecast} from '~/containers/connectors'
import Sponsor from '~/containers/Sponsor'
import {LocateAsClass} from '~/components/button/Locate'
import {Wrapper} from '~/components/tooltip'
import {Feed} from '~/containers/feed'

const LOCATE_STYLE = {
    padding: '0.15em'
}
const ARROW_STYLE = {
    left: 'calc(50% + 7px)'
}

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
    const NAVBAR_STYLE = isUnderSpecialWarning ? {
        justifyContent: 'space-between'
    } : null

    return (
        <DrawerContainer>
            <Navbar style={NAVBAR_STYLE}>
                {isUnderSpecialWarning && <SPAW link={specialWarningLink} />}
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject='Avalanche Forecast'>
                <h1>
                    {link ? <Link {...link}>{title}</Link> : title}
                    {isLoading ||
                    <Wrapper tooltip='Display on map' arrowStyle={ARROW_STYLE}>
                        <LocateAsClass onClick={onLocateClick} style={LOCATE_STYLE} />
                    </Wrapper>
                    }
                </h1>
                {forecast && <Metadata {...forecast} shareUrl={shareUrl} />}
            </Header>
            <Body>
                {isLoading && <Muted>Loading avalanche bulletin...</Muted>}
                {isError &&
                    <Error>
                        Error happened while loading avalanche bulletin.
                    </Error>
                }
                {(isLoaded && !forecast) && (
                    <Feed type='blog' category='north-rockies' />
                )}
                {forecast && <Forecast {...forecast} />}
            </Body>
        </DrawerContainer>
    )
}

export default forecast(Container)
