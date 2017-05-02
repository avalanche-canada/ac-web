const CARDINALS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']

export function toCompass(degrees) {
    return CARDINALS[Math.round(degrees % 360 / 45)]
}
