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
import { Provider, Pending, Found, NotFound, Payload } from 'contexts/async'

Layout.propTypes = {
    id: PropTypes.string.isRequired,
}

export default function Layout({ id }) {
    const title = (
        <Payload>
            {report => (report ? report.title : 'Mountain Information Network')}
        </Payload>
    )

    return (
        <Provider value={useReport(id)}>
            <Page>
                <Header title={title} />
                <Content>
                    <Main>
                        <Pending>
                            <Loading>
                                Loading Mountain Information Network report...
                            </Loading>
                        </Pending>
                        <Found>
                            {report => (
                                <Submission value={report}>
                                    <Metadata />
                                    <Map />
                                    <TabSet />
                                    <Gallery />
                                </Submission>
                            )}
                        </Found>
                        <NotFound>
                            <Warning>
                                Report with id {id} has not been found.
                            </Warning>
                        </NotFound>
                    </Main>
                    <Aside>
                        <Sidebar>
                            {supported() && (
                                <Found>
                                    <Item>
                                        <Link id={id}>
                                            See this submission on the main map
                                        </Link>
                                    </Item>
                                </Found>
                            )}
                        </Sidebar>
                    </Aside>
                </Content>
            </Page>
        </Provider>
    )
}
