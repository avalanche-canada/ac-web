import React, { Fragment } from 'react'
import { Entry, Symbol, Name, Description } from 'components/map/legend'
import Panel from './Panel'
import parking from './parking.svg'
import shelter from './shelter.svg'
import destination from './destination.svg'
import { Warning } from 'components/icons'
import { WARNING } from 'constants/colors'
import { Entries as TerrainRatingsEntries } from './TerrainRatings'
import { FormattedMessage } from 'react-intl'
import { useIntlMemo } from 'hooks/intl'

export default function MapLegend() {
    const header = (
        <FormattedMessage
            description="Layout TripPlanner/panels/MapLegend"
            defaultMessage="Map legend"
        />
    )

    return (
        <Panel header={header}>
            <TerrainRatingsEntries />
            <Entries />
        </Panel>
    )
}

// Constants and utils
export function Entries() {
    const names = useNames()

    return (
        <Fragment>
            <Entry>
                <Symbol title={names[0]}>
                    <Warning color={WARNING} />
                </Symbol>
                <Name>{names[0]}</Name>
            </Entry>
            <Entry>
                <Symbol title={names[1]}>
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
                <Name>{names[1]}</Name>
                <Description>
                    <FormattedMessage
                        description="Layout TripPlanner/panels/MapLegend"
                        defaultMessage="The arrow is pointing down the path."
                    />
                </Description>
            </Entry>
            <Entry>
                <Symbol style={LIGHT_BACKGROUND} title={names[2]}>
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
                <Name>{names[2]}</Name>
            </Entry>
            <Entry>
                <Symbol title={names[3]}>
                    <img width={20} src={destination} alt={names[3]} />
                </Symbol>
                <Name>{names[3]}</Name>
            </Entry>
            <Entry>
                <Symbol title={names[4]}>
                    <img width={20} src={shelter} alt={names[4]} />
                </Symbol>
                <Name>{names[4]}</Name>
            </Entry>
            <Entry>
                <Symbol title={names[5]}>
                    <img width={20} src={parking} alt={names[5]} />
                </Symbol>
                <Name>{names[5]}</Name>
            </Entry>
        </Fragment>
    )
}
function useNames() {
    const description = 'Layout TripPlanner/panels/MapLegend'

    return useIntlMemo(intl => [
        intl.formatMessage({
            description,
            defaultMessage: 'Decision Point',
        }),
        intl.formatMessage({
            description,
            defaultMessage: 'Major avalanche path',
        }),
        intl.formatMessage({
            description,
            defaultMessage: 'Main access trail',
        }),
        intl.formatMessage({
            description,
            defaultMessage: 'Destination',
        }),
        intl.formatMessage({
            description,
            defaultMessage: 'Hut, cabin or shelter',
        }),
        intl.formatMessage({
            description,
            defaultMessage: 'Parking',
        }),
    ])
}
const LIGHT_BACKGROUND = {
    backgroundColor: '#EBEBEB',
}
