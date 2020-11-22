import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { FormattedMessage } from 'react-intl'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import DetailSet from './DetailSet'
import Confidence from './Confidence'
import OffSeason from './OffSeason'
import TravelAndTerrainAdvice from './TravelAndTerrainAdvice'
import { DangerRatings } from './danger'
import ProblemSet from './problem'

TabSet.propTypes = {
    onTabChange: PropTypes.func,
}

export default function TabSet({ onTabChange = noop }) {
    return (
        <Tabs onTabChange={onTabChange}>
            <HeaderSet>
                <Header>
                    <FormattedMessage
                        description="FX tab header"
                        defaultMessage="Danger ratings"
                    />
                </Header>
                <Header>
                    <FormattedMessage
                        description="FX tab header"
                        defaultMessage="Problems"
                    />
                </Header>
                <Header>
                    <FormattedMessage
                        description="FX tab header"
                        defaultMessage="Details"
                    />
                </Header>
            </HeaderSet>
            <PanelSet>
                <Panel>
                    <OffSeason />
                    <DangerRatings />
                    <TravelAndTerrainAdvice />
                </Panel>
                <Panel>
                    <ProblemSet />
                </Panel>
                <Panel>
                    <DetailSet />
                    <Confidence />
                </Panel>
            </PanelSet>
        </Tabs>
    )
}
