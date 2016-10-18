import React, {PropTypes, createElement} from 'react'
import {Link} from 'react-router'
import {Page, Header, Main, Content, Headline} from 'components/page'
import {Muted, Error} from 'components/misc'
import {mountainInformationNetworkSubmission} from 'containers/connectors'
import {Submission, Metadata} from 'components/mountainInformationNetwork'

Container.propTypes = {
    title: PropTypes.string.isRequired,
    report: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
}

function Container({
    title = 'Mountain Information Network',
    metadata,
    isLoading,
    isError,
    props,
    messages,
}) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {metadata && <Metadata {...metadata} />}
                    {isLoading && <Muted>Loading submission...</Muted>}
                    {isError && <Error>Error happened while loading submission.</Error>}
                    {props && <Submission {...props} />}
                </Main>
            </Content>
        </Page>
    )
}

export default mountainInformationNetworkSubmission(Container)
