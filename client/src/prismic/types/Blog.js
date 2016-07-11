import PARSER from '../parser'

const {assign} = Object

export default class Blog {
    constructor(data) {
        assign(this, data)
    }
    static fromDocument(document, parser = PARSER) {
        const data = parser.parse(document)
        const {date, tags} = data

        return new Blog({
            ...data,
            featured: tags.includes('featured'),
            year: date && date.getFullYear(),
            month: date && date.getMonth(),
        })
    }
}
