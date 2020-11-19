export async function loadMessages(locale) {
    let module

    if (locale.match(/^fr/i)) {
        module = await import('./locales/compiled/fr-CA.json')
    } else {
        module = await import('./locales/compiled/en-CA.json')
    }

    return module.default
}
