import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isWithinRange from 'date-fns/is_within_range'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import Panel, { INVERSE } from 'components/panel'
import Generic from 'prismic/components/Generic'
import CriticalFactors from './CriticalFactors'
import TerrainAndTravelAdvice from './TerrainAndTravelAdvice'
import TerrainAdviceSet from './TerrainAdviceSet'
import ImageGallery from 'components/gallery'
import { ArchiveWarning } from 'components/misc'
import styles from './HotZoneReport.css'

export default class HotZoneReport extends PureComponent {
    static propTypes = {
        report: PropTypes.object,
    }
    get warning() {
        const { report } = this.props

        if (
            isWithinRange(
                new Date(),
                startOfDay(report.dateOfIssue),
                endOfDay(report.validUntil)
            )
        ) {
            return null
        }

        const nowcast = {
            to: `/hot-zone-reports/${report.region}`,
            children: "Read today's report",
        }

        return (
            <ArchiveWarning nowcast={nowcast}>
                This is an archived HotZone report
            </ArchiveWarning>
        )
    }
    get information() {
        return (
            <Panel expandable theme={INVERSE} header="More information">
                <Generic uid="hot-zone-report-more-information" />
            </Panel>
        )
    }
    get about() {
        return (
            <Panel expandable theme={INVERSE} header="About">
                <Generic uid="hot-zone-report-about" />
            </Panel>
        )
    }
    get gallery() {
        const { hotzoneImages } = this.props.report

        if (!Array.isArray(hotzoneImages) || hotzoneImages.length === 0) {
            return null
        }

        const items = hotzoneImages.map(({ hotzoneImage, caption }) => ({
            original: hotzoneImage.main.url,
            description: caption,
        }))

        return (
            <div className={styles.Gallery}>
                <ImageGallery
                    items={items}
                    showBullets={items.length > 1}
                    showPlayButton={items.length > 1}
                    showThumbnails={false}
                />
            </div>
        )
    }
    render() {
        const { report } = this.props

        if (report) {
            return [
                this.warning,
                <div className={styles.Title}>{report.title}</div>,
                <div className={styles.Headline}>{report.headline}</div>,
                this.gallery,
                <CriticalFactors {...report} />,
                <TerrainAndTravelAdvice report={report} />,
                <TerrainAdviceSet {...report} />,
                this.information,
                this.about,
            ]
        }

        return [this.information, this.about]
    }
}
