import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { MONTH } from 'constants/intl'
import { FR } from 'constants/locale'

export function useIntlMemo(compute) {
    const intl = useIntl()

    return useMemo(() => compute(intl), [intl.locale])
}

export function useMonths() {
    return useIntlMemo(intl =>
        Array(12)
            .fill(0)
            .map((value, index) =>
                intl.formatDate(new Date(1, index, 1), MONTH)
            )
    )
}

export function useAspects() {
    return useIntlMemo(intl =>
        intl.locale === FR ? ASPECTS.map(translateAspect) : ASPECTS
    )
}

const ASPECTS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
function translateAspect(aspect) {
    return aspect.replace('W', 'O')
}
