import React from 'react'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { Article } from 'components/page'
import Tutorial from 'containers/WeatherTutorial'
import { Loop } from 'components/weather'

export default function Precipitation12h() {
    return (
        <Article title="12hr Total Precipitation">
            <Tabs>
                <HeaderSet>
                    <Header>BC R</Header>
                    <Header>South Coast HR</Header>
                    <Header>South Interior HR</Header>
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop type="AC_RDPS_BC_12hr-precip" withNotes />
                    </Panel>
                    <Panel>
                        <Loop type="AC_HRDPS_BC-S-Cst_12hr-precip" withNotes />
                    </Panel>
                    <Panel>
                        <Loop type="AC_HRDPS_BC-S-Int_12hr-precip" withNotes />
                    </Panel>
                    <Panel>
                        <Tutorial uid="12h-precipitation" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}
