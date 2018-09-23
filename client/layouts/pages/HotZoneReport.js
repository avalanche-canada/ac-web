import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Page, Header, Main, Content, Aside } from 'components/page'
import { Loading } from 'components/text'
import { Item } from 'components/sidebar'
import * as Hzr from 'layouts/products/hzr'
import { Document } from 'prismic/containers'
import { hotZone } from 'prismic/params'
import { HotZone } from 'containers/features'
import * as utils from 'utils/hzr'

export default class HotZoneReportLayout extends PureComponent {
    static propTypes = {
        region: PropTypes.string.isRequired,
        uid: PropTypes.string,
    }
    renderHeader = (report, loading) => {
        return (
            <HotZone name={this.props.region}>
                {({ data }) => (
                    <Header
                        title={utils.title({ report, loading, hotZone: data })}
                    />
                )}
            </HotZone>
        )
    }
    renderReport = ({ document, loading }) => (
        <Fragment>
            {this.renderHeader(document, loading)}
            <Content>
                <Main>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Hzr.Report value={document}>
                            <Hzr.Metadata shareable />
                            <Hzr.ArchiveWarning />
                            <Hzr.Header />
                            <Hzr.Gallery />
                            <Hzr.CriticalFactors />
                            <Hzr.TerrainAndTravelAdvice />
                            <Hzr.TerrainAdviceSet />
                            <Hzr.Footer />
                        </Hzr.Report>
                    )}
                </Main>
                <Aside>
                    <Hzr.Report value={document}>
                        <Hzr.Sidebar shareable>
                            <Item>
                                <Link
                                    to={`/map/hot-zone-reports/${
                                        this.props.region
                                    }`}>
                                    See that report on the main map
                                </Link>
                            </Item>
                        </Hzr.Sidebar>
                    </Hzr.Report>
                </Aside>
            </Content>
        </Fragment>
    )
    render() {
        const { uid, region } = this.props
        const params = uid ? hotZone.uid(uid) : hotZone.report(region)

        return (
            <Page>
                <Document {...params}>{this.renderReport}</Document>
            </Page>
        )
    }
}
