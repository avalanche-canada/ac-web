import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Header, Container, Body, Navbar, Close} from 'components/page/drawer'
import {Metadata, Submission} from 'components/mountainInformationNetwork'
import {Locate} from 'components/button'
import {Loading, Error} from 'components/misc'
import Sponsor from 'containers/Sponsor'
import {mountainInformationNetworkSubmission} from 'containers/connectors'

function MountainInformationNetwork({
    title,
    metadata,
    isLoading,
    isError,
    props,
    messages,
    link,
    onCloseClick,
    onLocateClick,
}) {
    const {error, loading} = messages
    const shareUrl = link && `${window.location.origin}${link}`

    return (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject='Mountain Information Network'>
                <h1>
                    <Link to={link}>{title}</Link>
                    <Locate onClick={onLocateClick} />
                </h1>
                {metadata && <Metadata {...metadata} shareUrl={shareUrl} />}
            </Header>
            <Body>
                {isError && <Error>{error}</Error>}
                {isLoading && <Loading>{loading}</Loading>}
                {props && <Submission {...props} />}
            </Body>
        </Container>
    )
}

export default mountainInformationNetworkSubmission(MountainInformationNetwork)
