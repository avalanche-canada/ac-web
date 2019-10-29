import React, { createContext, useState, useEffect, useContext } from 'react'
import { globalHistory } from '@reach/router'

const LocationContext = createContext({
    location: globalHistory.location,
    navigate: globalHistory.navigate,
})

export function LocationProvider({ children }) {
    const [value, setValue] = useState(useLocation())

    useEffect(
        () =>
            // Returns the "unlisten"
            globalHistory.listen(({ location }) => {
                setValue(value => ({ ...value, location }))
            }),
        []
    )

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    )
}

export function useLocation() {
    return useContext(LocationContext)
}
