import { createContext } from 'react'

const LocaleContext = createContext('en')

export const Provider = LocaleContext.Provider
export const Consumer = LocaleContext.Consumer
