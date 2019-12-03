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
    const [sponsors] = useCacheAsync(requests.sponsors, [date], {})

    return (
        <SponsorsContext.Provider value={sponsors}>
            {children}
        </SponsorsContext.Provider>
    )
}

function useSponsors() {
    return useContext(SponsorsContext)
}

export function useSponsor(name) {
    return useSponsors()[name] || name
}

const SponsorsContext = createContext()
