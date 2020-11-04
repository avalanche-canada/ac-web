export async function loadMessages(locale) {
    if (locale.match(/^fr/i)) {
        const module = await import('./locales/compiled/fr.json')

        return module.default
    }

    return {}
}
