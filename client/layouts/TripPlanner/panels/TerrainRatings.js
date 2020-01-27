import React, { Fragment } from 'react'
import { Entry, Symbol, Name, Description } from 'components/map/legend'
import Panel from './Panel'
import Ratings, {
    SIMPLE,
    Texts,
    Descriptions,
    Palette,
} from 'constants/forecast/ates'
import { WHITE, BLACK } from 'constants/forecast/palette'

export default function TerrainRatingsPanel() {
    return (
        <Panel header="Terrain Ratings Explained">
            <Entries />
        </Panel>
    )
}

// Utils
export function Entries() {
    return (
        <Fragment>
            {Array.from(Ratings, rating => (
                <Entry key={rating}>
                    <Symbol style={getStyle(rating)}></Symbol>
                    <Name>{Texts.get(rating)}</Name>
                    <Description>{Descriptions.get(rating)}</Description>
                </Entry>
            ))}
        </Fragment>
    )
}
function getStyle(rating) {
    return {
        backgroundColor: Palette.get(rating),
    }
}
