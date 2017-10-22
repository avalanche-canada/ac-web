import React from 'react'
import { Article } from 'components/page'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { Loop } from 'components/weather'
import Tutorial from 'containers/WeatherTutorial'

export default function Satellite() {
    return (
        <Article title="Satellite Imagery">
            <Tabs>
                <HeaderSet>
                    <Header>IR West Coast</Header>
                    <Header>IR Pacific</Header>
                    <Header>Water Vapour/Jet</Header>
                    <Header>IR-VIS BC</Header>
                    <Header>1km VIS BC</Header>
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel title="">
                        <Loop
                            type="AC_SAT_CAN-W-CST_ir-redtop"
                            interval={200}
                            amount={24}
                        />
                    </Panel>
                    <Panel title="">
                        <Loop
                            type="AC_SAT_EPA_ir-redtop"
                            interval={200}
                            amount={24}
                        />
                    </Panel>
                    <Panel title="">
                        <Loop
                            type="AC_SAT_EPA_water-vapour-jet"
                            interval={200}
                            amount={24}
                        />
                    </Panel>
                    <Panel title="">
                        <Loop type="AC_SAT_BC_ir-vis" interval={200} />
                    </Panel>
                    <Panel title="">
                        <Loop type="AC_SAT_BC_visible" interval={200} />
                    </Panel>
                    <Panel title="">
                        <Tutorial uid="satellite" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}
