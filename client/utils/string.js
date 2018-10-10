export function initials(name) {
    if (!name || typeof name !== 'string') {
        return
    }

    const [first = '', second = ''] = name.split(' ')

    return (first.charAt(0) + second.charAt(0)).toUpperCase()
}

export function pluralize(word, count, inclusive) {
    const pluralized = count === 1 ? word : `${word}s`

    return inclusive ? `${count} ${pluralized}` : pluralized
}
