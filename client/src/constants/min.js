import * as MIN_COLORS from '~/components/icons/min/colors'

export const QUICK = 'quick'
export const WEATHER = 'weather'
export const SNOWPACK = 'snowpack'
export const AVALANCHE = 'avalanche'
export const INCIDENT = 'incident'

export const TYPES = [QUICK, AVALANCHE, SNOWPACK, WEATHER, INCIDENT]

export const NAMES = new Map([
    [QUICK, 'Quick'],
    [AVALANCHE, 'Avalanche'],
    [SNOWPACK, 'Snowpack'],
    [WEATHER, 'Weather'],
    [INCIDENT, 'Incident'],
])

export const COLORS = new Map([
    [QUICK, MIN_COLORS.QUICK],
    [AVALANCHE, MIN_COLORS.AVALANCHE],
    [SNOWPACK, MIN_COLORS.SNOWPACK],
    [WEATHER, MIN_COLORS.WEATHER],
    [INCIDENT, MIN_COLORS.INCIDENT],
])
