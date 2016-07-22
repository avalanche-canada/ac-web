import words from 'lodash/words'
import startCase from 'lodash/startCase'

export function classify(string) {
    return startCase(string).replace(/\s/g, '')
}

export function getInitials(name) {
    if (!name) {
        return
    }

    const [first, second] = words(name)

    return ((first[0] || '') + (second[0] || '')).toUpperCase()
}
