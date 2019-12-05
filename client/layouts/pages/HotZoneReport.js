import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Header, Main, Content, Aside } from 'components/page'
import { Page } from 'layouts/pages'
import { Loading } from 'components/text'
import { Item } from 'components/sidebar'
import * as Hzr from 'layouts/products/hzr'
import { hotZone } from 'prismic/params'
import { useAdvisoryMetadata } from 'hooks/async/features'
import * as utils from 'utils/hzr'
import { useDocument } from 'prismic/hooks'

HotZoneReportLayout.propTypes = {
    region: PropTypes.string.isRequired,
    uid: PropTypes.string,
}

export default function HotZoneReportLayout({ region, uid }) {
    const [area] = useAdvisoryMetadata(region)
    const params = uid ? hotZone.uid(uid) : hotZone.report(region)
    const [document, pending] = useDocument(params)

    return (
        <Page>
            <Header
                title={
                    pending
                        ? 'Loading...'
                        : utils.title({
                              region,
                              report: document,
                              hotZone: area,
                          })
                }
            />
            <Content>
                <Main>
                    {pending ? (
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
                                <Link to={`/map/advisories/${region}`}>
                                    See that advisory on the main map
                                </Link>
                            </Item>
                        </Hzr.Sidebar>
                    </Hzr.Report>
                </Aside>
            </Content>
        </Page>
    )
}
