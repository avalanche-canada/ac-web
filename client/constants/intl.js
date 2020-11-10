export const DATE = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}

export const TIME = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
}

export const DATETIME = {
    ...DATE,
    ...TIME,
}

export const MONTH = {
    month: 'long',
}

export const CM = {
    style: 'unit',
    unit: 'centimeter',
    unitDisplay: 'narrow',
}

export const M = {
    style: 'unit',
    unit: 'centimeter',
    unitDisplay: 'narrow',
}

export const KM = {
    style: 'unit',
    unit: 'kilometer',
    unitDisplay: 'narrow',
}

export const MBAR = {
    style: 'unit',
    unit: 'millibar',
    unitDisplay: 'narrow',
}
