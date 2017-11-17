import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Header, Container, Body, Navbar, Close } from 'components/page/drawer'
import { Metadata, Submission } from 'components/mountainInformationNetwork'
import { Loading, Error } from 'components/text'
import Sponsor from 'layouts/Sponsor'
import { mountainInformationNetworkSubmission } from 'containers/connectors'
import DisplayOnMap from './DisplayOnMap'

MountainInformationNetwork.propTypes = {
    title: PropTypes.string.isRequired,
    metadata: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    props: PropTypes.object,
    messages: PropTypes.object.isRequired,
    link: PropTypes.string,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

function MountainInformationNetwork({
    title,
    metadata,
    isLoading,
    isError,
    // TODO: Should be renamed to submission
    props,
    messages,
    link,
    onCloseClick,
    onLocateClick,
}) {
    const { error, loading } = messages
    const shareUrl = `${window.location.origin}${link}`

    return (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject="Mountain Information Network">
                <h1>
                    {link ? <Link to={link}>{title}</Link> : title}
                    {isLoading || <DisplayOnMap onClick={onLocateClick} />}
                </h1>
                {metadata && <Metadata {...metadata} shareUrl={shareUrl} />}
            </Header>
            <Body>
                {isError && <Error>{error}</Error>}
                {isLoading ? (
                    <Loading>{loading}</Loading>
                ) : (
                    <Submission {...props} />
                )}
            </Body>
        </Container>
    )
}

export default mountainInformationNetworkSubmission(MountainInformationNetwork)
