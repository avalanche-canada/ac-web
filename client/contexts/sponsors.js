import React, { createContext, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as requests from 'requests/static'
import { useCacheAsync } from 'hooks/async'
import { DateParam } from 'hooks/params'
import { useLocalStorage } from 'hooks'

Provider.propTypes = {
    children: PropTypes.element,
}

export function Provider({ children }) {
    const date = DateParam.format(new Date())
    const [SPONSORS, set] = useLocalStorage('sponsors', {})
    const [sponsors] = useCacheAsync(requests.sponsors, [date])

    useEffect(() => {
        if (sponsors) {
            set(sponsors)
        }
    }, [sponsors])

    return (
        <SponsorsContext.Provider value={sponsors || SPONSORS}>
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
