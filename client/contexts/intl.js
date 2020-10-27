import React, { createContext, useState, useEffect, useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { useLocalStorage } from 'hooks'
import { loadMessages } from 'services/intl'

const LocaleContext = createContext()

export function Provider({ children }) {
    const defaultLocale = navigator.language || DEFAULT_LOCALE
    const [locale, set] = useLocalStorage('locale', defaultLocale)
    const context = useMemo(() => ({ locale, set }), [locale])
    const [messages, setMessages] = useState(null)

    useEffect(() => {
        loadMessages(locale).then(setMessages)
    }, [locale])

    return (
        <LocaleContext.Provider value={context}>
            {messages && (
                <IntlProvider
                    key={locale}
                    locale={locale}
                    messages={messages}
                    defaultLocale={DEFAULT_LOCALE}>
                    {children}
                </IntlProvider>
            )}
        </LocaleContext.Provider>
    )
}

const DEFAULT_LOCALE = 'en-CA'
