import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import formatDate from 'date-fns/format'
import { resource } from 'api/requests/static'
import { useLocalStorage, useFetch, useTimeout } from 'utils/react/hooks'

Provider.propTypes = {
    children: PropTypes.element,
}

export function Provider({ children }) {
    const ready = useTimeout(999)
    const [data] = useFetch(ready ? resource('sponsors') : null)
    const [sponsors, setSponsors] = useLocalStorage(
        'sponsors',
        SPONSORS,
        JSON.parse,
        JSON.stringify
    )

    if (data) {
        const date = formatDate(new Date(), 'YYYY-MM-DD')

        setSponsors(Object.assign({}, data.default, data[date]))
    }

    return (
        <SponsorsContext.Provider value={sponsors}>
            {children}
        </SponsorsContext.Provider>
    )
}

const SPONSORS = {
    About: 'rmr',
    BlogIndex: 'teck',
    BlogPage: 'mec',
    EventIndex: 'varda',
    EventPage: 'black-diamond',
    Forecast: 'acf',
    Gear: 'garmin-inreach',
    MIN: 'rmr',
    NewsIndex: 'northface',
    NewsPage: 'outdoorresearch',
    Training: 'revelstoke-tourism',
    Weather: 'cbt',
    Youth: 'cbt',
}

const SponsorsContext = createContext()

export default SponsorsContext
