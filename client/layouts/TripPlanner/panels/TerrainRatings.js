import React from 'react'
import StaticComponent from 'components/StaticComponent'
import { Section, Header, Content } from 'components/explanation'
import Panel from './Panel'
import Ratings, {
    SIMPLE,
    Texts,
    Descriptions,
    Palette,
} from 'constants/forecast/ates'
import { WHITE, BLACK } from 'constants/forecast/palette'

export default class TerrainRatingsPanel extends StaticComponent {
    getStyle(rating) {
        return {
            padding: '0.5em',
            margin: 0,
            color: rating === SIMPLE ? BLACK : WHITE,
            backgroundColor: Palette.get(rating),
        }
    }
    render() {
        return (
            <Panel header="Terrain Ratings Explained">
                {Array.from(Ratings).map(rating => (
                    <Section key={rating}>
                        <Header style={this.getStyle(rating)}>
                            {Texts.get(rating)}
                        </Header>
                        <Content>
                            <p>{Descriptions.get(rating)}</p>
                        </Content>
                    </Section>
                ))}
            </Panel>
        )
    }
}
