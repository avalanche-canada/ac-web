import PARSER from '../parser'

const {assign} = Object

export default class News {
    constructor(data) {
        assign(this, data)
    }
    static fromDocument(document, parser = PARSER) {
        if (!document) {
            return null
        }

        const data = parser.parse(document)
        const {date, tags} = data

        return new News({
            ...data,
            featured: tags.includes('featured'),
            year: date.getFullYear(),
            month: date.getMonth(),
        })
    }
}
