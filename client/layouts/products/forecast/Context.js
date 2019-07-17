import { createContext, useContext } from 'react'

const Context = createContext()

export const { Provider } = Context
export function useForecast() {
    return useContext(Context)
}
