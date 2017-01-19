import PARSER from '../parser'
import {normalizeTags} from './utils'

export function fromDocument(document, parser = PARSER) {
    if (!document) {
        return null
    }

    const data = parser.parse(document)
    const {startDate, endDate, tags} = data

    return {
        ...data,
        featured: tags.includes('featured'),
        tags: normalizeTags(tags),
        start: startDate,
        end: endDate,
        date: startDate,
        year: startDate && startDate.getFullYear(),
        month: startDate && startDate.getMonth(),
    }
}
