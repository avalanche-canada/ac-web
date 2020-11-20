import * as React from 'react'
import * as Async from 'contexts/async'
import PanelComponent from 'components/panel'
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
