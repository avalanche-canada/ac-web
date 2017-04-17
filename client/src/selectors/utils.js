import {ASC, DESC, NONE} from '~/constants/sortings'

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
