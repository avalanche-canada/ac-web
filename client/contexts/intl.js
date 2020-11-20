import React, {
    createContext,
    useState,
    useEffect,
    useMemo,
    useContext,
} from 'react'
import { IntlProvider } from 'react-intl'
import { loadMessages } from 'services/intl'
import { useLocalStorage } from 'hooks'
import Button from 'components/button'
import LOCALE, { FR, LOCALES, TEXTS } from 'constants/locale'
import { noop } from 'utils/function'

const LocaleContext = createContext()

export function useLocale() {
    return useContext(LocaleContext)
}

export function useLocaleCode() {
    const { locale } = useLocale()

    return locale
}

export function useLanguage() {
    const locale = useLocaleCode()

    return locale.substr(0, 2)
}

export function Provider({ children, defaultLocale }) {
    const [storedLocale, store] = useLocalStorage('locale')
    const [locale, setLocale] = useState(
        defaultLocale || storedLocale || navigator.language || LOCALE
    )
    const context = useMemo(
        () => ({
            locale,
            set(locale) {
                setLocale(locale)
                store(locale)
            },
        }),
        [locale]
    )
    const [messages, setMessages] = useState(null)

    useEffect(() => {
        loadMessages(locale).then(setMessages)
    }, [locale])

    return (
        <LocaleContext.Provider value={context}>
            {messages && (
                <IntlProvider
                    onError={noop}
                    key={locale}
                    locale={locale}
                    messages={messages}
                    defaultLocale={LOCALE}>
                    {children}
                </IntlProvider>
            )}
        </LocaleContext.Provider>
    )
}

// Utils component to display children only when locale is set to provided locale (value).
// Useful to display warning about product not fully translated.
export function LocaleSwitch({ children, value = FR }) {
    const locale = useLocaleCode()

    return value === locale ? children : null
}

export function LocaleSwitcher() {
    const { locale, set } = useLocale()

    return Array.from(LOCALES, loc => (
        <Button key={loc} disabled={loc === locale} onClick={() => set(loc)}>
            {TEXTS.get(loc)}
        </Button>
    ))
}
