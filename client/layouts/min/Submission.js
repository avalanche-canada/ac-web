import React from 'react'
import PropTypes from 'prop-types'
import { supported } from 'utils/mapbox'
import { Header, Main, Content, Aside } from 'components/page'
import { Page } from 'layouts/pages'
import { MountainInformationNetwork as Link } from 'components/links'
import { Item } from 'components/sidebar'
import { Loading, Warning } from 'components/text'
import {
    Submission,
    TabSet,
    Gallery,
    Metadata,
    Map,
    Sidebar,
} from 'layouts/products/min'
import { useReport } from 'hooks/async/min'
import * as Async from 'contexts/async'
import { FormattedMessage } from 'react-intl'

Layout.propTypes = {
    id: PropTypes.string.isRequired,
}

export default function Layout({ id }) {
    const title = (
        <Async.Payload>
            {report =>
                report?.title || (
                    <FormattedMessage defaultMessage="Mountain Information Network" />
                )
            }
        </Async.Payload>
    )

    return (
        <Async.Provider value={useReport(id)}>
            <Page>
                <Header title={title} />
                <Content>
                    <Main>
                        <Async.Pending>
                            <Loading>
                                <FormattedMessage
                                    description="Layout min/Submission"
                                    defaultMessage="Loading Mountain Information Network report..."
                                />
                            </Loading>
                        </Async.Pending>
                        <Async.Found>
                            {report => (
                                <Submission value={report}>
                                    <Metadata />
                                    <Map />
                                    <TabSet />
                                    <Gallery />
                                </Submission>
                            )}
                        </Async.Found>
                        <Async.NotFound>
                            <Warning>
                                <FormattedMessage
                                    description="Layout min/Submission"
                                    defaultMessage="Mountain Information Network report with id {id} has not been found."
                                    values={{ id }}
                                />
                            </Warning>
                        </Async.NotFound>
                    </Main>
                    <Aside>
                        <Sidebar>
                            {supported() && (
                                <Async.Found>
                                    <Item>
                                        <Link id={id}>
                                            <FormattedMessage
                                                description="Layout min/Submission"
                                                defaultMessage="See this submission on the main map"
                                            />
                                        </Link>
                                    </Item>
                                </Async.Found>
                            )}
                        </Sidebar>
                    </Aside>
                </Content>
            </Page>
        </Async.Provider>
    )
}
