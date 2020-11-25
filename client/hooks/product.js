import * as React from 'react'
import * as Products from 'constants/products'

export function useSections(products) {
    return React.useMemo(() => {
        const forecasts = products.filter(p => Products.isKindOfForecast(p.type))
        const owners = Array.from(new Set(forecasts.map(f => f.owner.display))).sort()

        return new Map(
            owners.map(owner => [
                owner,
                forecasts.filter(f => f.owner.display === owner).sort(sortForecast),
            ])
        )
    }, [products])
}

// Utils
function sortForecast(a, b) {
    return a.report.title.localeCompare(b.report.title)
}
