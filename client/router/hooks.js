import { useState, useEffect } from 'react'
import { globalHistory } from '@reach/router'

export function useLocation() {
    const [state, setState] = useState({
        location: globalHistory.location,
        navigate: globalHistory.navigate,
    })

    useEffect(() => {
        const removeListener = globalHistory.listen(({ location }) => {
            setState(state => {
                if (location === state.location) {
                    return state
                }

                return {
                    ...state,
                    location,
                }
            })
        })
        return () => {
            removeListener()
        }
    }, [])

    return state
}
