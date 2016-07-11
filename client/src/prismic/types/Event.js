import PARSER from '../parser'

const {assign} = Object

export default class Event {
    constructor(data) {
        assign(this, data)
    }
    static fromDocument(document, parser = PARSER) {
        const data = parser.parse(document)
        const {startDate, tags} = data

        return new Event({
            ...data,
            featured: tags.includes('featured'),
            date: startDate,
            year: startDate && startDate.getFullYear(),
            month: startDate && startDate.getMonth(),
        })
    }
}
