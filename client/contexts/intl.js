import React, {
    createContext,
    useState,
    useEffect,
    useMemo,
    useContext,
} from 'react'
import { IntlProvider, FormattedDisplayName } from 'react-intl'
import { loadMessages } from 'services/intl'
import { useLocalStorage } from 'hooks'
import Button, { ButtonSet } from 'components/button'
import LOCALE, { FR, LOCALES } from 'constants/locale'

const LocaleContext = createContext()

export function useLocale() {
    return useContext(LocaleContext)
}

export function useLocaleCode(short = false) {
    const { locale } = useLocale()

    return short ? locale.substr(0, 2) : locale
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
    const { locale } = useLocale()

    return value === locale ? children : null
}

export function LocaleSwitcher() {
    const { locale, set } = useLocale()

    return (
        <ButtonSet>
            {Array.from(LOCALES).map(LOCALE => (
                <Button
                    key={LOCALE}
                    disabled={LOCALE === locale}
                    onClick={() => set(LOCALE)}>
                    <FormattedDisplayName
                        type="language"
                        value={LOCALE.substr(0, 2)}
                    />
                </Button>
            ))}
        </ButtonSet>
    )
}
