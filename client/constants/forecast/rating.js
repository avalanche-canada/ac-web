import * as ForecastPalette from '~/constants/forecast/palette'

export const LOW = 'LOW'
export const MODERATE = 'MODERATE'
export const CONSIDERABLE = 'CONSIDERABLE'
export const HIGH = 'HIGH'
export const EXTREME = 'EXTREME'
export const NO_RATING = 'NO_RATING'

export default new Set([LOW, MODERATE, CONSIDERABLE, HIGH, EXTREME, NO_RATING])

export const TravelAdvices = new Map([
    [EXTREME, 'Avoid all avalanche terrain.'],
    [HIGH, 'Very dangerous avalanche conditions.\n Travel in avalanche terrain not recommended.'],
    [CONSIDERABLE, 'Dangerous avalanche conditions. Careful snowpack evaluation,\n cautious route-finding and conservative decision-making essential.'],
    [MODERATE, 'Heightened avalanche conditions on specific terrain features.\n Evaluate snow and terrain carefully; identify features of concern.'],
    [LOW, 'Generally safe avalanche conditions.\n Watch for unstable snow on isolated terrain features.'],
    [NO_RATING, null],
])

export const LikehoodOfAvalanche = new Map([
    [EXTREME, 'Natural and human-triggered avalanches certain.'],
    [HIGH, 'Natural avalanches likely;\n human-triggered avalanches very likely.'],
    [CONSIDERABLE, 'Natural avalanches possible;\n human-triggered avalanches likely.'],
    [MODERATE, 'Natural avalanches unlikely;\n human-triggered avalanches possible.'],
    [LOW, 'Natural and human-triggered avalanches unlikely.'],
    [NO_RATING, null],
])

export const Palette = new Map([
    [EXTREME, ForecastPalette.BLACK],
    [HIGH, ForecastPalette.RED],
    [CONSIDERABLE, ForecastPalette.ORANGE],
    [MODERATE, ForecastPalette.YELLOW],
    [LOW, ForecastPalette.GREEN],
    [NO_RATING, ForecastPalette.WHITE],
])

export const SizeAndDistribution = new Map([
    [EXTREME, 'Large to very large avalanches in many areas.'],
    [HIGH, 'Large avalanches in many areas;\n or very large avalanches in specific areas.'],
    [CONSIDERABLE, 'Small avalanches in many areas;\n or large avalanches in specific areas;\n or very large avalanches in isolated areas.'],
    [MODERATE, 'Small avalanches in specific areas;\n or large avalanches in isolated areas.'],
    [LOW, 'Small avalanches in isolated areas or extreme terrain.'],
    [NO_RATING, null],
])

export const Texts = new Map([
    [EXTREME, '5 - Extreme'],
    [HIGH, '4 - High'],
    [CONSIDERABLE, '3 - Considerable'],
    [MODERATE, '2 - Moderate'],
    [LOW, '1 - Low'],
    [NO_RATING, '0 - No Rating'],
])
