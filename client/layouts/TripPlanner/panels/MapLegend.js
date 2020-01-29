import React, { Fragment } from 'react'
import { Entry, Symbol, Name, Description } from 'components/map/legend'
import Panel from './Panel'
import parking from './parking-11.svg'
import hut from './hut-11.svg'
import { Warning } from 'components/icons'
import { WARNING } from 'constants/colors'
import { Entries as TerrainRatingsEntries } from './TerrainRatings'

export default function MapLegend() {
    return (
        <Panel header="Map legend">
            <TerrainRatingsEntries />
            <Entries />
        </Panel>
    )
}

// Constants and utils
export function Entries() {
    return (
        <Fragment>
            <Entry>
                <Symbol>
                    <Warning color={WARNING} />
                </Symbol>
                <Name>Decision Point</Name>
            </Entry>
            <Entry>
                <Symbol>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 100 100">
                        <path
                            fill="none"
                            strokeWidth={10}
                            stroke="red"
                            d="M1.8 99l97-97.7"
                        />
                        <path
                            fill="none"
                            strokeWidth={10}
                            stroke="red"
                            d="M30 97H2V70"
                        />
                    </svg>
                </Symbol>
                <Name>Major avalanche path</Name>
                <Description>The arrow is pointing down the path.</Description>
            </Entry>
            <Entry>
                <Symbol style={LIGHT_BACKGROUND}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 100 100">
                        <path
                            fill="none"
                            stroke="yellow"
                            strokeWidth={10}
                            d="M13.6 99.8s-7-40.4 39.1-52.5C87.1 38.3 80 .3 80 .3"
                        />
                    </svg>
                </Symbol>
                <Name>Main access trail</Name>
            </Entry>
            <Entry>
                <Symbol>
                    <img
                        width={20}
                        src={hut}
                        title="Hut, Cabin or shelter"
                        alt="hut"
                    />
                </Symbol>
                <Name>Hut, cabin or shelter</Name>
            </Entry>
            <Entry>
                <Symbol>
                    <img
                        width={20}
                        src={parking}
                        title="Parking"
                        alt="parking"
                    />
                </Symbol>
                <Name>Parking</Name>
            </Entry>
        </Fragment>
    )
}
const LIGHT_BACKGROUND = {
    backgroundColor: '#EBEBEB',
}
