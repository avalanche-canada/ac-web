import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import Drawer, {LEFT, RIGHT, Header, Content} from './'
import {LayerSet, Layer} from './layers'
import {compose, withState} from 'recompose'
import Button from 'components/button'
import * as TYPES from 'constants/map/layers'

const background = {
    backgroundColor: '#7EC0EE',
    height: '100vh',
}
const header = (
    <Header subject='Avalanche Forecast'>
        <h1>Title</h1>
    </Header>
)
const style = {marginTop:150, marginBottom: 150}
const content = (
    <div>
        <p style={style}>Drawer content</p>
        <p style={style}>Drawer content</p>
        <p style={style}>Drawer content</p>
        <p style={style}>Drawer content</p>
    </div>
)

function Controlled({open, setOpen, ...rest}) {
    const header = (
        <Header onCloseClick={e => setOpen(false)}>
            <h1>Title</h1>
        </Header>
    )

    return (
        <div style={background}>
            <Button onClick={e => setOpen(!open)}>Toggle</Button>
            <Drawer open={open} side={RIGHT} {...rest} header={header}>
                <Content>
                    {content}
                </Content>
            </Drawer>
        </div>
    )
}


Controlled = compose(
    withState('open', 'setOpen', false)
)(Controlled)

function TwoDrawers({open, setOpen, width, setWidth, ...rest}) {
    const header = (
        <Header onCloseClick={e => setOpen(!open)} >
            <h1>Title</h1>
        </Header>
    )

    return (
        <div style={background}>
            <Drawer open={open} side={LEFT} width={width} header={header} onClose={action('onClose Left')} onOpen={action('onOpen Left')} >
                <Content>
                    <label for='width' >Width</label>
                    <input id='width' name='width' type='number' value={width} onChange={e => setWidth(e.target.value)} />
                    {content}
                </Content>
            </Drawer>
            <Drawer open={!open} side={RIGHT} header={header} onClose={action('onClose Right')} onOpen={action('onOpen Right')} >
                <Content>
                    {content}
                </Content>
            </Drawer>
        </div>
    )
}

TwoDrawers = compose(
    withState('open', 'setOpen', false),
    withState('width', 'setWidth', 500),
)(TwoDrawers)

storiesOf('Page Drawer', module)
.add('Default and opened', () => (
    <Drawer open>
        <Content>
            The drawer content on the left
        </Content>
    </Drawer>
))
.add('Opened with a header', () => (
    <Drawer open header={header}>
        <Content>
            The drawer content on the left
        </Content>
    </Drawer>
))
.add('Opened on the right', () => (
    <Drawer open side={RIGHT} header={header}>
        <Content>
            {content}
        </Content>
    </Drawer>
))
.add('Controlled', () => <Controlled />)
.add('Two drawers', () => <TwoDrawers />)
.add('Menu drawer', () => {
    const dateRange = {
        from: null,
        to: null
    }
    const listOfValues = {
        options: new Map([
            ['all', 'All reports'],
            ['quick', 'Quick'],
            ['avalanche', 'Avalanche'],
            ['snowpack', 'Snowpack'],
            ['weather', 'Weather'],
            ['incident', 'Incident'],
        ]),
        value: 'all',
    }

    return (
        <Drawer open width={300}>
            <Header />
            <Content>
                <LayerSet title='Avalanche Forecast'>
                    <Layer type={TYPES.FORECASTS} title='Forecasts' active={false} />
                    <Layer type={TYPES.HOT_ZONE_REPORTS} title='Hot Zone Reports' />
                </LayerSet>
                <LayerSet title='Observations'>
                    <Layer type={TYPES.MOUNTAIN_INFORMATION_NETWORK} title='Mountain Information Network' filters={{dateRange, listOfValues}} />
                    <Layer type={TYPES.WEATHER_STATION} title='Weather stations' />
                </LayerSet>
            </Content>
        </Drawer>
    )
})
