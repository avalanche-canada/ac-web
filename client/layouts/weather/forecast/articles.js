import React from 'react'
import { Article } from 'components/page'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { Loop } from 'components/weather'
import { Launch } from 'components/icons'
import metadata from 'services/msc/loop/metadata.json'
import Tutorial from './Tutorial'

export function HourlyPrecipitation() {
    return (
        <Article title="Hourly Precipitation">
            <Tabs>
                <HeaderSet>
                    <LoopHeader id="AC_HRDPS_BC_wms-1hr-precip" />
                    <LoopHeader id="AC_HRDPS_BC-S-Cst_1hr-precip" />
                    <LoopHeader id="AC_HRDPS_BC-S-Int_1hr-precip" />
                    <LoopHeader id="AC_HRDPS_Alberta-Rockies_1hr-precip" />
                    <LoopHeader id="AC_RDPS_BC_precip-types" />
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop
                            type="AC_HRDPS_BC_wms-1hr-precip"
                            interval={500}
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_HRDPS_BC-S-Cst_1hr-precip"
                            interval={500}
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_HRDPS_BC-S-Int_1hr-precip"
                            interval={500}
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_HRDPS_Alberta-Rockies_1hr-precip"
                            interval={500}
                        />
                    </Panel>
                    <Panel>
                        <Loop type="AC_RDPS_BC_precip-types" interval={500} />
                    </Panel>
                    <Panel>
                        <Tutorial uid="hourly-precipitation" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}

export function Precipitation12h() {
    return (
        <Article title="12hr Total Precipitation">
            <Tabs>
                <HeaderSet>
                    <LoopHeader id="AC_RDPS_BC_12hr-precip" />
                    <LoopHeader id="AC_HRDPS_BC-S-Cst_12hr-precip" />
                    <LoopHeader id="AC_HRDPS_BC-S-Int_12hr-precip" />
                    <LoopHeader id="AC_HRDPS_Alberta-Rockies_12hr-precip" />
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop type="AC_RDPS_BC_12hr-precip" />
                    </Panel>
                    <Panel>
                        <Loop type="AC_HRDPS_BC-S-Cst_12hr-precip" />
                    </Panel>
                    <Panel>
                        <Loop type="AC_HRDPS_BC-S-Int_12hr-precip" />
                    </Panel>
                    <Panel>
                        <Loop type="AC_HRDPS_Alberta-Rockies_12hr-precip" />
                    </Panel>
                    <Panel>
                        <Tutorial uid="12h-precipitation" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}

export function Temperatures() {
    return (
        <Article title="Temperatures">
            <Tabs>
                <HeaderSet>
                    <LoopHeader id="AC_RDPS_BC_freezing-level" />
                    <LoopHeader id="AC_GDPS_BC_850-temp-4am" />
                    <LoopHeader id="AC_GDPS_BC_850-temp-4pm" />
                    <LoopHeader id="AC_HRDPS_BC_sfc-temp-3hr-freq" />
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop type="AC_RDPS_BC_freezing-level" />
                    </Panel>
                    <Panel>
                        <Loop type="AC_GDPS_BC_850-temp-4am" />
                    </Panel>
                    <Panel>
                        <Loop type="AC_GDPS_BC_850-temp-4pm" />
                    </Panel>
                    <Panel>
                        <Loop type="AC_HRDPS_BC_sfc-temp-3hr-freq" />
                    </Panel>
                    <Panel>
                        <Tutorial uid="temperatures" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}

export function Winds() {
    return (
        <Article title="Winds">
            <Tabs>
                <HeaderSet>
                    <LoopHeader id="AC_RDPS_BC_marine-winds" />
                    <LoopHeader id="AC_GDPS_BC_850-winds" />
                    <LoopHeader id="AC_GDPS_BC_750-winds" />
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop type="AC_RDPS_BC_marine-winds" />
                    </Panel>
                    <Panel>
                        <Loop type="AC_GDPS_BC_850-winds" interval={500} />
                    </Panel>
                    <Panel>
                        <Loop type="AC_GDPS_BC_750-winds" interval={500} />
                    </Panel>
                    <Panel>
                        <Tutorial uid="winds" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}

export function SurfaceMaps() {
    return (
        <Article title="Surface Maps">
            <Tabs>
                <HeaderSet>
                    <LoopHeader id='AC_RDPS_CAN-W_3hr-precip-clds-th-slp' />
                    <LoopHeader id='AC_GDPS_EPA_6hr-precip-clds-th-slp' />
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop
                            type="AC_RDPS_CAN-W_3hr-precip-clds-th-slp"
                            interval={500}
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_GDPS_EPA_6hr-precip-clds-th-slp"
                            interval={500}
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

export function OtherMaps() {
    return (
        <Article title="500 mb & Precipitable Water">
            <Tabs>
                <HeaderSet>
                    <LoopHeader id='AC_GDPS_EPA_clds-th-500hts' />
                    <LoopHeader id='AC_GDPS_EPA_tpw' />
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop
                            type="AC_GDPS_EPA_clds-th-500hts"
                            interval={500}
                        />
                    </Panel>
                    <Panel>
                        <Loop type="AC_GDPS_EPA_tpw" interval={500} />
                    </Panel>
                    <Panel>
                        <Tutorial uid="other-maps" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}

export function Radar() {
    return (
        <Article title="Radar Imagery">
            <Tabs>
                <HeaderSet>
                    <LoopHeader id='AC_RADAR_BC_precip-rate' />
                    <LoopHeader id='AC_RADAR_BC-S-CST_precip-rate' />
                    <LoopHeader id='AC_RADAR_BC-S-INT_precip-rate' />
                    <LoopHeader id='AC_RADAR_Alberta-Rockies_precip-rate' />
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop
                            type="AC_RADAR_BC_precip-rate"
                            interval={200}
                            amount={18}
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_RADAR_BC-S-CST_precip-rate"
                            interval={200}
                            amount={18}
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_RADAR_BC-S-INT_precip-rate"
                            interval={200}
                            amount={18}
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_RADAR_Alberta-Rockies_precip-rate"
                            interval={200}
                            amount={18}
                        />
                    </Panel>
                    <Panel>
                        <Tutorial uid="radar" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}

export function Satellite() {
    return (
        <Article title="Satellite Imagery">
            <Tabs>
                <HeaderSet>
                    <LoopHeader id='AC_SAT_CAN-W-CST_ir-redtop' />
                    <LoopHeader id='AC_SAT_EPA_ir-redtop' />
                    <LoopHeader id='AC_SAT_EPA_water-vapour-jet' />
                    <LoopHeader id='AC_SAT_BC_ir-vis' />
                    <LoopHeader id='AC_SAT_BC_visible' />
                    <LoopHeader id='AC_SAT_BC-S-CST_visible' />
                    <LoopHeader id='AC_SAT_BC-S-INT_visible' />
                    <LoopHeader id='AC_SAT_Alberta-Rockies_visible' />
                    <Header>Tutorials</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
                        <Loop
                            type="AC_SAT_CAN-W-CST_ir-redtop"
                            interval={200}
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_SAT_EPA_ir-redtop"
                            interval={200}
                        />
                    </Panel>
                    <Panel>
                        <Loop
                            type="AC_SAT_EPA_water-vapour-jet"
                            interval={200}
                        />
                    </Panel>
                    <Panel>
                        <Loop type="AC_SAT_BC_ir-vis" interval={200} />
                    </Panel>
                    <Panel>
                        <Loop type="AC_SAT_BC_visible" interval={200} />
                    </Panel>
                    <Panel>
                        <Loop type="AC_SAT_BC-S-CST_visible" interval={200} />
                    </Panel>
                    <Panel>
                        <Loop type="AC_SAT_BC-S-INT_visible" interval={200} />
                    </Panel>
                    <Panel>
                        <Loop type="AC_SAT_Alberta-Rockies_visible" interval={200} />
                    </Panel>
                    <Panel>
                        <Tutorial uid="satellite" />
                    </Panel>
                </PanelSet>
            </Tabs>
        </Article>
    )
}

export function ActualTemperatures() {
    return (
        <Article title="Actual Temperatures (12 hours)">
            <Tabs>
                <HeaderSet>
                    <LoopHeader id='AC_PLOT_BC_actual-temps' />
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

export function Warnings() {
    return (
        <Article title="Warnings">
            <a
                href="https://weather.gc.ca/warnings/index_e.html"
                target="weather-warnings">
                Warnings are avaialble on weather.gc.ca{' '}
                <Launch height={14} width={14} />
            </a>
        </Article>
    )
}

// Utils
function LoopHeader({ id, ...props }) {
    return <Header {...props}>{metadata[id].shortTitle}</Header>
}
