import React from 'react'
import { Article } from 'components/page'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import Tutorial from '../Tutorial'
import Loop from 'components/weather/Loop'

export default function SurfaceMaps() {
    return (
        <Article title="500mb & Precipitable Water">
            <Tabs>
                <HeaderSet>
                    <Header>500mb</Header>
                    <Header>Precipitable Water</Header>
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop
                            type="AC_GDPS_EPA_clds-th-500hts"
                            interval={500}
                            withNotes
                        />
                    </Panel>
                    <Panel>
                        <Loop type="AC_GDPS_EPA_tpw" interval={500} withNotes />
                    </Panel>
                    <Panel>
                        <Tutorial uid="other-maps" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}
