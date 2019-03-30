import React, { Fragment } from 'react'
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

HotZoneReportLayout.propTypes = {
    region: PropTypes.string.isRequired,
    uid: PropTypes.string,
}

export default function HotZoneReportLayout({ region, uid }) {
    const params = uid ? hotZone.uid(uid) : hotZone.report(region)

    return (
        <Page>
            <Document {...params}>
                {({ document, loading }) => (
                    <Fragment>
                        <HotZone name={region}>
                            {({ data }) => (
                                <Header
                                    title={utils.title({
                                        report: document,
                                        loading,
                                        hotZone: data,
                                    })}
                                />
                            )}
                        </HotZone>
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
                                                to={`/map/advisories/${region}`}>
                                                See that advisory on the main
                                                map
                                            </Link>
                                        </Item>
                                    </Hzr.Sidebar>
                                </Hzr.Report>
                            </Aside>
                        </Content>
                    </Fragment>
                )}
            </Document>
        </Page>
    )
}
