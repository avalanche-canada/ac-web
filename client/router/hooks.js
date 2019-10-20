import { useState, useEffect } from 'react'
import { globalHistory } from '@reach/router'

export function useLocation() {
    const initialState = {
        location: globalHistory.location,
        navigate: globalHistory.navigate,
    }

    const [state, setState] = useState(initialState)

    useEffect(() => {
        const removeListener = globalHistory.listen(params => {
            const { location } = params
            const newState = Object.assign({}, initialState, { location })
            setState(newState)
        })
        return () => {
            removeListener()
        }
    }, [])

    return state
}
