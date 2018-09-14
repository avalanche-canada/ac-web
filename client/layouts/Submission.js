import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import isSupported from '@mapbox/mapbox-gl-supported'
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

export default class Layout extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }
    renderHeader(data) {
        const title = data ? data.title : 'Mountain Information Network'
    }
    children = ({ loading, data }) => {
        const title = data ? data.title : 'Mountain Information Network'

        return (
            <Fragment>
                <Header title={title} />
                <Content>
                    <Main>
                        {loading && (
                            <Loading>
                                Loading Mountain Information Network report...
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
                            {isSupported() && (
                                <Item>
                                    <Link id={this.props.id}>
                                        See this submission on the main map
                                    </Link>
                                </Item>
                            )}
                        </Sidebar>
                    </Aside>
                </Content>
            </Fragment>
        )
    }
    render() {
        return (
            <Page>
                <Report id={this.props.id}>{this.children}</Report>
            </Page>
        )
    }
}
