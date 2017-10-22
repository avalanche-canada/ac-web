import React from 'react'
import { Article } from 'components/page'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import Tutorial from 'containers/WeatherTutorial'
import Loop from 'components/weather/Loop'

export default function SurfaceMaps() {
    return (
        <Article title="Surface Maps">
            <Tabs>
                <HeaderSet>
                    <Header>0-48 Hours R</Header>
                    <Header>0-144 Hours G</Header>
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop
                            type="AC_RDPS_CAN-W_3hr-precip-clds-th-slp"
                            interval={500}
                            withNotes
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_GDPS_EPA_6hr-precip-clds-th-slp"
                            interval={500}
                            withNotes
                        />
                    </Panel>
                    <Panel>
                        <Tutorial uid="surface-maps" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}
