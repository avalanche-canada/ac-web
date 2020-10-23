import { createIntl, createIntlCache } from 'react-intl'

const DEFAULT_LOCALE = 'en-CA'

export default async function create(locale = DEFAULT_LOCALE) {
    const cache = createIntlCache()
    const options = {
        locale,
        messages: await loadMessages(locale),
        defaultLocale: DEFAULT_LOCALE,
    }

    return createIntl(options, cache)
}

async function loadMessages(locale) {
    let messages

    if (locale.match(/^fr/i)) {
        messages = await import('./locales/compiled/fr.json')
    } else {
        messages = await import('./locales/compiled/en.json')
    }

    return messages.default
}
