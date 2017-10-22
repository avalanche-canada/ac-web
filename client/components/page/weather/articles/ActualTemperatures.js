import React from 'react'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { Article } from 'components/page'
import Tutorial from 'containers/WeatherTutorial'
import { Loop } from 'components/weather'

export default function ActualTemperatures() {
    return (
        <Article title="Actual Temperatures (12 hours)">
            <Tabs>
                <HeaderSet>
                    <Header>Actual Temperatures</Header>
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop type="AC_PLOT_BC_actual-temps" amount={12} />
                    </Panel>
                    <Panel>
                        <Tutorial uid="actual-temperatures" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}
