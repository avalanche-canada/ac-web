import * as RATINGS from 'constants/forecast/danger/rating'
import {keys, heading} from 'constants/utils'

const {VALUES, TEXTS, ADVICES, LIKEHOOD, SIZE_AND_DISTRIBUTION} = RATINGS
const KEYS = keys(VALUES).filter(key => key !== 'NO_RATING')

function section(heading, key) {
    return `
${heading} ${TEXTS[key]}

${ADVICES[key]}

${LIKEHOOD[key]}

${SIZE_AND_DISTRIBUTION[key]}
`}

export function explanation(level = 2) {
    function reducer(explanation, key) {
        return explanation + section(heading(level), key)
    }

    return KEYS.reduce(reducer, '')
}

export default explanation()
