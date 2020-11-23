import * as React from 'react'
import { useIntl } from 'react-intl'
import { DATE, MONTH } from 'constants/intl'
import { FR } from 'constants/locale'

export function useIntlMemo(compute, dependencies) {
    const intl = useIntl()

    dependencies = Array.isArray(dependencies)
        ? [intl.locale, ...dependencies]
        : dependencies

    return React.useMemo(() => compute(intl), dependencies)
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

export function useFormatDate(date) {
    return useIntlMemo(intl => intl.formatDate(date, DATE), [date])
}

// Constants and utils
const ASPECTS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
function translateAspect(aspect) {
    return aspect.replace('W', 'O')
}
