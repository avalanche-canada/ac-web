import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Page, Header, Main, Content, Aside } from 'components/page'
import { Status } from 'components/misc'
import { Item } from 'components/sidebar'
import * as Hzr from 'layouts/products/hzr'
import { HotZoneReport as Container } from 'prismic/containers'
import HotZone from 'containers/HotZone'
import * as utils from 'utils/hzr'

export default class HotZoneReportLayout extends PureComponent {
    static propTypes = {
        region: PropTypes.string.isRequired,
        uid: PropTypes.string,
    }
    renderHeader = props => {
        return <Header title={utils.title(props)} />
    }
    renderChildrenFactory = ({ report, status }) => ({ hotZone }) => (
        <Fragment>
            {this.renderHeader({ report, status, hotZone })}
            <Content>
                <Main>
                    <Status {...status} />
                    {status.isLoaded && (
                        <Hzr.Report value={report}>
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
                    <Hzr.Report value={report}>
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
    children = props => (
        <HotZone id={this.props.region}>
            {this.renderChildrenFactory(props)}
        </HotZone>
    )
    render() {
        return (
            <Page>
                <Container {...this.props}>{this.children}</Container>
            </Page>
        )
    }
}
