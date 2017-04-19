import isNumber from 'lodash/isNumber'
import isFinite from 'lodash/isFinite'

function isFiniteNumber(value) {
    return isNumber(value) && isFinite(value)
}

export function shouldShowGraph(data, prop) {
    return data.some(object => isFiniteNumber(object[prop]))
}

export function filterDataset(data, prop) {
    return data.filter(object => isFiniteNumber(object[prop]))
}
