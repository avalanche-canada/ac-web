import PARSER from '../parser'
import {normalizeTags} from './utils'

export default function(document, parser = PARSER) {
    if (!document) {
        return null
    }

    const data = parser.parse(document)
    const {shortlede, body, previewImage, uid, date, tags} = data

    return {
        ...data,
        headline: shortlede,
        content: body,
        preview: previewImage,
        link: `${document.type}s/${uid}`,
        featured: tags.includes('featured'),
        tags: normalizeTags(tags),
        year: date && date.getFullYear(),
        month: date && date.getMonth(),
    }
}
