import PARSER from '../parser'
import {normalizeTags} from './utils'

export default function(document, parser = PARSER) {
    if (!document) {
        return null
    }

    const data = parser.parse(document)
    const {shortlede, body, featuredImage, uid, date, tags} = data

    return {
        ...data,
        headline: shortlede,
        content: body,
        preview: featuredImage,
        link: `${document.type}/${uid}`,
        featured: tags.includes('featured'),
        tags: normalizeTags(tags),
        year: date.getFullYear(),
        month: date.getMonth(),
    }
}
