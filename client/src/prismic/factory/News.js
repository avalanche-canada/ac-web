import PARSER from '../parser'
import {normalizeTags} from './utils'

export function fromDocument(document, parser = PARSER) {
    if (!document) {
        return null
    }

    const data = parser.parse(document)
    const {date, tags} = data

    return {
        ...data,
        featured: tags.includes('featured'),
        tags: normalizeTags(tags),
        year: date.getFullYear(),
        month: date.getMonth(),
    }
}
