const StringToBoolean = new Map([
    ['Yes', true],
    ['No', false],
    [undefined, false],
])

export function boolean(string) {
    return StringToBoolean.get(string)
}

export function normalizeTags(tags) {
    if (Array.isArray(tags)) {
        return Array.from(new Set(tags.map(tag => tag.trim().toLowerCase())))
    }
}
