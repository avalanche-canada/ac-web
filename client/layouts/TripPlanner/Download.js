import React from 'react'
import { useMachine } from '@xstate/react'
import { Machine } from 'xstate'
import Dialog, { Header, Footer, Body } from 'components/dialog'
import Button, { Close, ButtonSet } from 'components/button'
import button from 'components/button/Button.css'
import * as Async from 'contexts/async'
import { useGeneric } from 'prismic/hooks'
import { GenericBody } from 'prismic/layouts'
import { Loading } from 'components/text'

export default function Download({ name, id, onClose }) {
    const [current, send] = useMachine(DOWNLOAD)
    const { value, nextEvents } = current
    const uid = UIDS.get(value)
    const prefix = 'Download ATES data for ' + name
    function moveToNext() {
        send('NEXT')
    }

    return (
        <Dialog open>
            <Async.Provider value={useGeneric(uid)}>
                <Header>
                    <Async.Pending>{prefix}</Async.Pending>
                    <Async.Found>
                        {document => `${prefix} — ${document.data.title}`}
                    </Async.Found>
                    <Close onClick={onClose}></Close>
                </Header>
                <Body>
                    <Async.Pending>
                        <Loading />
                    </Async.Pending>
                    <Async.Found>
                        <GenericBody />
                    </Async.Found>
                </Body>
                <Footer>
                    <ButtonSet>
                        <Button onClick={onClose}>Cancel</Button>
                        {nextEvents.includes('NEXT') && (
                            <Button onClick={moveToNext}>Ok</Button>
                        )}
                        {value === 'download' && (
                            <a
                                download={`${name}.kmz`}
                                href={`/api/ates/en/${id}.kmz`}
                                className={button.Primary}>
                                {prefix}
                            </a>
                        )}
                    </ButtonSet>
                </Footer>
            </Async.Provider>
        </Dialog>
    )
}

// Constants
const UIDS = new Map([
    ['usage', 'using-ates-data'],
    ['disclaimer', 'ates-download-disclaimer'],
    ['download', 'ates-download-disclaimer'],
])
const DOWNLOAD = Machine({
    id: 'download',
    initial: 'usage',
    states: {
        usage: {
            on: {
                NEXT: 'disclaimer',
            },
        },
        disclaimer: {
            on: {
                NEXT: 'download',
                PREVIOUS: 'usage',
            },
        },
        download: {
            on: {
                PREVIOUS: 'disclaimer',
            },
        },
    },
})
