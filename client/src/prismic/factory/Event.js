import PARSER from '../parser'
import {normalizeTags} from './utils'

export default function(document, parser = PARSER) {
    if (!document) {
        return null
    }

    const data = parser.parse(document)
    const {shortlede, description, featuredImage, uid, startDate, endDate, tags} = post

    return {
        ...data,
        headline: shortlede,
        content: description,
        preview: featuredImage,
        link: `${document.type}s/${uid}`,
        featured: tags.includes('featured'),
        tags: normalizeTags(tags),
        start: startDate,
        end: endDate,
        date: startDate,
        year: startDate && startDate.getFullYear(),
        month: startDate && startDate.getMonth(),
    }
}
