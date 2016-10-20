import React, {PropTypes} from 'react'
import {Header, Container, Body, Navbar, Close} from 'components/page/drawer'
import {Metadata, Submission} from 'components/mountainInformationNetwork'
import {Loading, Error} from 'components/misc'
import {Link} from 'react-router'
import {mountainInformationNetworkSubmission} from 'containers/connectors'
import Sponsor from 'containers/Sponsor'

function MountainInformationNetwork({
    title,
    metadata,
    isLoading,
    isError,
    props,
    messages,
    link,
    onCloseClick,
}) {
    const {error, loading} = messages

    return (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject='Mountain Information Network'>
                <h1>
                    {link ? <Link to={link}>{title}</Link> : title}
                </h1>
                {metadata && <Metadata {...metadata} />}
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
