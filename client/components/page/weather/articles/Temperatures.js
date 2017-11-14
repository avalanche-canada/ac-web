import React from 'react'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { Article } from 'components/page'
import Tutorial from 'containers/WeatherTutorial'
import { Loop } from 'components/weather'

export default function Temperatures() {
    return (
        <Article title="Temperatures">
            <Tabs>
                <HeaderSet>
                    <Header>Freezing Level R</Header>
                    <Header>1500m 4am G</Header>
                    <Header>1500m 4pm G</Header>
                    <Header>Surface HR</Header>
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop type="AC_RDPS_BC_freezing-level" withNotes />
                    </Panel>
                    <Panel>
                        <Loop type="AC_GDPS_BC_850-temp-4am" withNotes />
                    </Panel>
                    <Panel>
                        <Loop type="AC_GDPS_BC_850-temp-4pm" withNotes />
                    </Panel>
                    <Panel>
                        <Loop type="AC_HRDPS_BC_sfc-temp-3hr-freq" withNotes />
                    </Panel>
                    <Panel>
                        <Tutorial uid="temperatures" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}
