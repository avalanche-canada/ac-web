import React from 'react'
import { LocaleSwitch, LocaleSwitcher } from 'contexts/intl'
import { Warning } from 'components/alert'
import Shim from 'components/Shim'

export default function LocaleWarning() {
    return (
        <LocaleSwitch>
            <Shim top>
                <Warning>
                    <p>
                        Les prévisions d'avalanches ne sont complètement
                        traduites par notre équipe de prévisionnistes.
                    </p>
                    <p>Vous pouvez consulter ces prévisions d'avalanches en:</p>
                    <LocaleSwitcher />
                </Warning>
            </Shim>
        </LocaleSwitch>
    )
}
