import { useMemo } from 'react'
import { useIntl } from 'react-intl'

export function useIntlMemo(compute) {
    const intl = useIntl()

    return useMemo(() => compute(intl), [intl.locale])
}
