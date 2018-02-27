import React from 'react'
import StaticComponent from 'components/StaticComponent'
import { Entry, Symbol, Name, Description } from 'components/map/legend'
import Panel from './Panel'
import RATINGS, { Texts, Descriptions, Palette } from 'constants/forecast/ates'
import parking from './parking-11.svg'
import hut from './hut-11.svg'
import mountain from './mountain-11.svg'

export default class MapLegend extends StaticComponent {
    getStyle(rating) {
        return {
            backgroundColor: Palette.get(rating),
        }
    }
    render() {
        return (
            <Panel header="Map legend">
                {Array.from(RATINGS).map(rating => (
                    <Entry key={rating}>
                        <Symbol style={this.getStyle(rating)} />
                        <Name>{Texts.get(rating)} terrain</Name>
                        <Description>{Descriptions.get(rating)}</Description>
                    </Entry>
                ))}
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
                    <Description>
                        The arrow is pointing down the path.
                    </Description>
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
                            src={mountain}
                            title="Mountain"
                            alt="mountain"
                        />
                    </Symbol>
                    <Name>Mountain</Name>
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
            </Panel>
        )
    }
}

// Constants
const LIGHT_BACKGROUND = {
    backgroundColor: '#EBEBEB',
}
