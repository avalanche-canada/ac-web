import words from 'lodash/words'
import startCase from 'lodash/startCase'

export function classify(string) {
    return startCase(string).replace(/\s/g, '')
}

export function initials(name) {
    if (!name) {
        return
    }

    const [first, second] = words(name)

    return ((first[0] || '') + (second[0] || '')).toUpperCase()
}

export function titleOf(children) {
    if (typeof children === 'string' || typeof children === 'number') {
        return children
    }

    return null
}

export function pluralize(word, count, inclusive) {
    const pluralized = count === 1 ? word : `${word}s`

    return inclusive ? `${count} ${pluralized}` : pluralized
}
