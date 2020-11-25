import * as React from 'react'
import * as Async from 'contexts/async'
import PanelComponent from 'components/panel'
import { forType } from 'components/alert'
import { GenericContent, Title } from './'
import Shim from 'components/Shim'

export function Panel() {
    return (
        <PanelComponent header={<Title />}>
            <Async.Found>
                {payload => (
                    <Shim horizontal>
                        <GenericContent payload={payload} />
                    </Shim>
                )}
            </Async.Found>
        </PanelComponent>
    )
}

export function Alert({ type, children }) {
    const AlertComponent = forType(type)

    return (
        <AlertComponent>
            <Async.Found>
                <GenericContent />
            </Async.Found>
            {children}
        </AlertComponent>
    )
}
