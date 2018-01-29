import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImageGallery from 'components/gallery'
import Tabs, {
    HeaderSet,
    ColoredHeader,
    PanelSet,
    Panel,
} from 'components/tabs'
import Observation from './Observation'
// TODO: INCIDENT should be opened if available
import { INCIDENT, NAMES, TYPES, COLORS } from 'constants/min'

export default class Submission extends PureComponent {
    static propTypes = {
        observations: PropTypes.arrayOf(PropTypes.object).isRequired,
        active: PropTypes.oneOf(TYPES),
        uploads: PropTypes.arrayOf(PropTypes.object).isRequired,
    }
    static defaultProps = {
        observations: [],
        uploads: [],
    }
    renderHeader = type => {
        const disabled = !this.props.observations.some(FILTERS.get(type))
        const color = COLORS.get(type)

        return (
            <ColoredHeader arrow key={type} disabled={disabled} color={color}>
                {NAMES.get(type)}
            </ColoredHeader>
        )
    }
    renderPanel = type => {
        const filter = FILTERS.get(type)
        const { observations } = this.props

        if (!observations.some(filter)) {
            return null
        }

        const { ob } = observations.find(filter)

        return (
            <Panel key={type}>
                <Observation type={type} observation={ob} />
            </Panel>
        )
    }
    get uploads() {
        const { uploads } = this.props

        if (uploads.length === 0) {
            return null
        }

        return (
            <ImageGallery
                items={uploads.map(toGalleryItem)}
                showBullets={uploads.length > 1}
                showPlayButton={uploads.length > 1}
                showThumbnails={false}
            />
        )
    }
    get firstObservationType() {
        const [observation] = this.props.observations

        return observation ? observation.obtype : null
    }
    get activeIndex() {
        return TYPES.indexOf(this.props.active || this.firstObservationType)
    }
    render() {
        return (
            <div>
                <Tabs activeIndex={this.activeIndex}>
                    <HeaderSet>{TYPES.map(this.renderHeader)}</HeaderSet>
                    <PanelSet>{TYPES.map(this.renderPanel)}</PanelSet>
                </Tabs>
                {this.uploads}
            </div>
        )
    }
}

function toGalleryItem(upload) {
    return {
        original: `/api/min/uploads/${upload}`,
    }
}

const FILTERS = new Map(
    TYPES.map(type => [type, observation => observation.obtype === type])
)
