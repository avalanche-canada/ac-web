import React, {PropTypes} from 'react'
import {Header, Content, Body} from 'components/page/drawer'
import {Metadata} from 'components/mountainInformationNetwork'
import {Submission} from 'components/mountainInformationNetwork'
import {Loading, Error} from 'components/misc'
import {Link} from 'react-router'
import {mountainInformationNetworkSubmission} from 'containers/connectors'

function MountainInformationNetwork({
    title,
    metadata,
    isLoading,
    isError,
    props,
    messages,
    link
}) {
    const {error, loading} = messages

    return (
        <Content>
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
        </Content>
    )
}

export default mountainInformationNetworkSubmission(MountainInformationNetwork)
