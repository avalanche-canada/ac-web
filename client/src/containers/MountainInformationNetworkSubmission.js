import React, {PropTypes} from 'react'
import {Header, Page, Main, Content, Aside} from 'components/page'
import {Submission, Metadata, Sidebar} from 'components/mountainInformationNetwork'
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
        <Page>
            <Header title={link ? <Link {...link}>{title}</Link> : title} />
            <Content>
                <Main>
                    {isError && <Error>{error}</Error>}
                    {isLoading && <Loading>{loading}</Loading>}
                    {metadata && <Metadata {...metadata} />}
                    {props && <Submission {...props} />}
                </Main>
                <Aside>
                    <Sidebar />
                </Aside>
            </Content>
        </Page>
    )
}

export default mountainInformationNetworkSubmission(MountainInformationNetwork)
