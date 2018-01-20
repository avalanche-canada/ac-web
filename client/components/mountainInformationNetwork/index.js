import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import BaseMetadata from './Metadata'
import BaseSubmission from './Submission'

export Sidebar from './Sidebar'

export class Metadata extends PureComponent {
    static propTypes = {
        report: PropTypes.object.isRequired,
        shareable: PropTypes.object,
    }
    get shareUrl() {
        const id = this.props.report.get('subid')
        const { origin } = window.location

        return `${origin}/mountain-information-network/submissions/${id}`
    }
    get properties() {
        const { report, shareable } = this.props

        return {
            shareUrl: shareable ? this.shareUrl : undefined,
            submittedOn: report.get('datetime'),
            submittedBy: report.get('user'),
            latitude: report.getIn(['latlng', 0]),
            longitude: report.getIn(['latlng', 1]),
        }
    }
    render() {
        return <BaseMetadata {...this.properties} />
    }
}

export class Submission extends PureComponent {
    static propTypes = {
        report: PropTypes.object.isRequired,
    }
    get properties() {
        const { report } = this.props

        return {
            observations: report.get('obs').toJSON(),
            active: report.get('obtype'),
            uploads: report.get('uploads').toJSON(),
        }
    }
    render() {
        return <BaseSubmission {...this.properties} />
    }
}
