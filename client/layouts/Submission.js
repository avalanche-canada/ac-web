import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { supported } from 'utils/mapbox'
import { Page, Header, Main, Content, Aside } from 'components/page'
import { MountainInformationNetwork as Link } from 'components/links'
import { Item } from 'components/sidebar'
import { Loading } from 'components/text'
import { Report } from 'containers/min'
import {
    Submission,
    TabSet,
    Gallery,
    Metadata,
    Map,
    Sidebar,
} from 'layouts/products/min'

Layout.propTypes = {
    id: PropTypes.string.isRequired,
}

export default function Layout({ id }) {
    return (
        <Page>
            <Report id={id}>
                {({ loading, data }) => {
                    const title = data
                        ? data.title
                        : 'Mountain Information Network'

                    return (
                        <Fragment>
                            <Header title={title} />
                            <Content>
                                <Main>
                                    {loading && (
                                        <Loading>
                                            Loading Mountain Information Network
                                            report...
                                        </Loading>
                                    )}
                                    <Submission value={data}>
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
                                                    See this submission on the
                                                    main map
                                                </Link>
                                            </Item>
                                        )}
                                    </Sidebar>
                                </Aside>
                            </Content>
                        </Fragment>
                    )
                }}
            </Report>
        </Page>
    )
}
