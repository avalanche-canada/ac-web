import * as React from 'react'
import { LocaleSwitch, LocaleSwitcher } from 'contexts/intl'
import { ButtonSet } from 'components/button'
import { WARNING } from 'components/alert'
import { GenericProvider } from 'prismic/layouts'
import { Alert } from 'prismic/layouts/renderers'
import { useReport } from '../Context'

export default function LocaleWarning() {
    const report = useReport()

    if (report.isFullTranslation === true) {
        return null
    }

    return (
        <LocaleSwitch>
            <GenericProvider uid="avertissement-previsions-pas-completement-traduites">
                <Alert type={WARNING}>
                    <ButtonSet>
                        <LocaleSwitcher />
                    </ButtonSet>
                </Alert>
            </GenericProvider>
        </LocaleSwitch>
    )
}
