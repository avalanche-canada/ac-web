import React from 'react'
import Dialog, { Footer, Body } from 'components/dialog'
import Button from 'components/button'
import { useBoolean } from 'hooks'

export default function NotProductionWarning() {
    const [open, , close] = useBoolean(true)

    return (
        <Dialog open={open}>
            <Body>
                <div style={STYLE}>
                    <h1>This is not the real Avalanche Canada website.</h1>
                    <p className="secondary-big-button" style={{ flex: 1 }}>
                        <a href="https://avalanche.ca">Bring me to avalanche.ca</a>
                    </p>
                </div>
            </Body>
            <Footer>
                <Button chevron="RIGHT" onClick={close}>
                    I know what I am doing
                </Button>
            </Footer>
        </Dialog>
    )
}
const STYLE = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2em',
    boxSizing: 'border-box',
    height: '100%',
}
