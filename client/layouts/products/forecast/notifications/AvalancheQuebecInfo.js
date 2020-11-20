import React from 'react'
import { Info } from 'components/alert'
import { AVALANCHE_QUEBEC } from 'constants/owners'
import Shim from 'components/Shim'

export default function AvalancheQuebecInfo() {
    return (
        <Shim top>
            <Info>
                <p>
                    This avalanche bulletin is produced by forecasters at
                    Avalanche Québec.
                </p>
                <p>
                    Visit their webite:{' '}
                    <a
                        href="https://avalanchequebec.ca/conditions-chic-chocs#bulletins-avalanche"
                        target={AVALANCHE_QUEBEC}>
                        avalanchequebec.ca
                    </a>
                </p>
            </Info>
        </Shim>
    )
}
