import {HeaderCellOrders} from '/components/table'

const {ASC, DESC, NONE} = HeaderCellOrders

const isNegativeRegex = /^-/

export function computeSorting(sorting) {
    if (!sorting) {
        return [null, NONE]
    }

    if (isNegativeRegex.test(sorting)) {
        return [sorting.replace(isNegativeRegex, ''), DESC]
    } else {
        return [sorting, ASC]
    }
}
