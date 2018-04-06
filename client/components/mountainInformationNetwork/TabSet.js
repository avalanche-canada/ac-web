import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Tabs, {
    HeaderSet,
    ColoredHeader,
    PanelSet,
    Panel,
} from 'components/tabs'
import Observation from './Observation'
import { INCIDENT, NAMES, TYPES, COLORS } from 'constants/min'

export default class TabSet extends PureComponent {
    static propTypes = {
        observations: PropTypes.arrayOf(PropTypes.object).isRequired,
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
    get activeTab() {
        const { observations } = this.props
        const hasIncident = observations.some(FILTERS.get(INCIDENT))
        const [observation] = observations

        return TYPES.indexOf(hasIncident ? INCIDENT : observation.obtype)
    }
    render() {
        return (
            <Tabs activeTab={this.activeTab}>
                <HeaderSet>{TYPES.map(this.renderHeader)}</HeaderSet>
                <PanelSet>{TYPES.map(this.renderPanel)}</PanelSet>
            </Tabs>
        )
    }
}

const FILTERS = new Map(
    TYPES.map(type => [type, observation => observation.obtype === type])
)
