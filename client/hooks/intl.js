import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { MONTH } from 'constants/intl'

export function useIntlMemo(compute) {
    const intl = useIntl()

    return useMemo(() => compute(intl), [intl.locale])
}

export function useMonths() {
    return useIntlMemo((intl) => Array(12)
        .fill(0)
        .map((value, index) => intl.formatDate(new Date(1, index, 1), MONTH)))
}