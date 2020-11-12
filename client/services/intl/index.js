export async function loadMessages(locale) {
    if (locale.match(/^fr/i)) {
        const module = await import('./locales/compiled/fr_CA.json')

        return module.default
    }

    return {}
}
