import React from 'react'
import PropTypes from 'prop-types'
import { supported } from 'utils/mapbox'
import { Page, Header, Main, Content, Aside } from 'components/page'
import { MountainInformationNetwork as Link } from 'components/links'
import { Item } from 'components/sidebar'
import { Loading } from 'components/text'
import {
    Submission,
    TabSet,
    Gallery,
    Metadata,
    Map,
    Sidebar,
} from 'layouts/products/min'
import { useReport } from 'hooks/min'

Layout.propTypes = {
    id: PropTypes.string.isRequired,
}

export default function Layout({ id }) {
    const [report, pending] = useReport(id)
    const title = report?.title || 'Mountain Information Network'

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {pending && (
                        <Loading>
                            Loading Mountain Information Network report...
                        </Loading>
                    )}
                    <Submission value={report}>
                        <Metadata />
                        <Map />
                        <TabSet />
                        <Gallery />
                    </Submission>
                </Main>
                <Aside>
                    <Sidebar>
                        {supported() && (
                            <Item>
                                <Link id={id}>
                                    See this submission on the main map
                                </Link>
                            </Item>
                        )}
                    </Sidebar>
                </Aside>
            </Content>
        </Page>
    )
}
