import PARSER from '../parser'

export function fromDocument(document, parser = PARSER) {
    if (!document) {
        return null
    }

    const data = parser.parse(document)
    const {startDate, tags} = data

    return {
        ...data,
        featured: tags.includes('featured'),
        date: startDate,
        year: startDate && startDate.getFullYear(),
        month: startDate && startDate.getMonth(),
    }
}
