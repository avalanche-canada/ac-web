import PARSER from '../parser'

export function fromDocument(document, parser = PARSER) {
    if (!document) {
        return null
    }

    const data = parser.parse(document)
    const {startDate, endDate, tags} = data

    return {
        ...data,
        featured: tags.includes('featured'),
        start: startDate,
        end: endDate,
        date: startDate,
        year: startDate && startDate.getFullYear(),
        month: startDate && startDate.getMonth(),
    }
}
