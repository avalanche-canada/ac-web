import words from 'lodash/words'
import startCase from 'lodash/startCase'

export function classify(string) {
    return startCase(string).replace(/\s/g, '')
}

export function initials(name) {
    if (!name || typeof name !== 'string') {
        return
    }

    const [first = '', second = ''] = words(name)

    return (first.charAt(0) + second.charAt(0)).toUpperCase()
}

export function pluralize(word, count, inclusive) {
    const pluralized = count === 1 ? word : `${word}s`

    return inclusive ? `${count} ${pluralized}` : pluralized
}
