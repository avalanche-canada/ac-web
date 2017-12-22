import React from 'react'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { Article } from 'components/page'
import Tutorial from '../Tutorial'
import { Loop } from 'components/weather'

export default function HourlyPrecipitation() {
    return (
        <Article title="Hourly Precipitation">
            <Tabs>
                <HeaderSet>
                    <Header>BC HR</Header>
                    <Header>South Coast HR</Header>
                    <Header>South Interior HR</Header>
                    <Header>Type R</Header>
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop
                            type="AC_HRDPS_BC_wms-1hr-precip"
                            interval={500}
                            withNotes
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_HRDPS_BC-S-Cst_1hr-precip"
                            interval={500}
                            withNotes
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_HRDPS_BC-S-Int_1hr-precip"
                            interval={500}
                            withNotes
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_RDPS_BC_precip-types"
                            interval={500}
                            withNotes
                        />
                    </Panel>
                    <Panel>
                        <Tutorial uid="hourly-precipitation" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}
