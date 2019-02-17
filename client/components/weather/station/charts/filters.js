import isNumber from 'lodash/isNumber'
import isFinite from 'lodash/isFinite'

export function shouldShowGraph(data, prop) {
    return data.some(object => isFiniteNumber(object[prop]))
}

export function filterDataset(data, prop) {
    return data.filter(object => isFiniteNumber(object[prop]))
}

function isFiniteNumber(value) {
    return isNumber(value) && isFinite(value)
}
