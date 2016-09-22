const StringToBoolean = new Map([
    ['Yes', true],
    ['No', false],
    [undefined, false],
])

export function boolean(string) {
    return StringToBoolean.get(string)
}
