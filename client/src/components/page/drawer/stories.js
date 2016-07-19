import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Drawer, {LEFT, RIGHT, Header} from './index'
import { compose, withState } from 'recompose'
import Button from 'components/button'

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
                {content}
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
                <label for='width' >Width</label>
                <input id='width' name='width' type='number' value={width} onChange={e => setWidth(e.target.value)} />
                {content}
            </Drawer>
            <Drawer open={!open} side={RIGHT} header={header} onClose={action('onClose Right')} onOpen={action('onOpen Right')} >
                {content}
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
        The drawer content on the left
    </Drawer>
))
.add('Opened with a header', () => (
    <Drawer open header={header}>
        The drawer content on the left
    </Drawer>
))
.add('Opened on the right', () => (
    <Drawer open side={RIGHT} header={header}>
        {content}
    </Drawer>
))
.add('Controlled', () => <Controlled />)
.add('Two drawers', () => <TwoDrawers />)
