import React from 'react'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { Article } from 'components/page'
import Tutorial from 'containers/WeatherTutorial'
import { Loop } from 'components/weather'

export default function Winds() {
    return (
        <Article title="Winds">
            <Tabs>
                <HeaderSet>
                    <Header>Surface R</Header>
                    <Header>1500m G</Header>
                    <Header>2500m G</Header>
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop type="AC_RDPS_BC_marine-winds" withNotes />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_GDPS_BC_850-winds"
                            interval={500}
                            withNotes
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_GDPS_BC_750-winds"
                            interval={500}
                            withNotes
                        />
                    </Panel>
                    <Panel>
                        <Tutorial uid="winds" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}
