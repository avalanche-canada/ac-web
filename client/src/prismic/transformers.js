import PARSER from 'prismic/parser'
import {normalizeTags, boolean} from 'prismic/utils'

export function blog(document, parser = PARSER) {
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

export function event(document, parser = PARSER) {
    if (!document) {
        return null
    }

    const data = parser.parse(document)
    const {shortlede, description, featuredImage, uid, startDate, endDate, tags} = data

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

export function news(document, parser = PARSER) {
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

export function staff(document, parser = PARSER) {
    const data = parser.parse(document)

    return {
        fullName: `${data.firstName} ${data.lastName}`,
        ...data,
    }
}

export function staticPage(document, parser = PARSER) {
    let {sharing, following, contacting, sidebar = [], contact, ...props} = parser.parse(document)

    sharing = boolean(sharing)
    following = boolean(following)
    contacting = boolean(contacting)

    return {
        ...props,
        sidebar: (sharing || following || contacting || sidebar.length) ? {
            share: sharing,
            follow: following,
            contact: contacting ? (
                typeof contact === 'string' ? contact.replace(/^mailto:/, '') : true
            ): false,
            content: sidebar,
        } : null
    }
}

function sponsor(document, parser = PARSER) {
    const sponsor = parser.parse(document)

    return {
        ...sponsor,
        logo: sponsor.image,
    }
}

const transformers = new Map([
    ['blog', blog],
    ['event', event],
    ['news', news],
    ['staff', staff],
    ['static-page', staticPage],
    ['sponsor', sponsor],
])

export default function transformer(document, parser = PARSER) {
    if (!document) {
        return null
    }

    const {type} = document

    if (transformers.has(type)) {
        return transformers.get(type).call(null, document)
    } else {
        return parser.parse(document)
    }
}
