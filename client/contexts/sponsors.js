import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import * as requests from 'requests/static'
import { useCacheAsync } from 'hooks/async'
import { DateParam } from 'hooks/params'

Provider.propTypes = {
    children: PropTypes.element,
}

export function Provider({ children }) {
    const date = DateParam.format(new Date())
    const [sponsors = EMPTY] = useCacheAsync(
        requests.sponsors,
        [date],
        undefined,
        'sponsors'
    )

    return (
        <SponsorsContext.Provider value={sponsors}>
            {children}
        </SponsorsContext.Provider>
    )
}

export function useSponsor(name) {
    const sponsors = useContext(SponsorsContext)

    return sponsors[name] || name
}

const SponsorsContext = createContext()
const EMPTY = {}
