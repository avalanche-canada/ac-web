import PARSER from '../parser'

const {assign} = Object

export default class YouthResource {
    constructor(data) {
        assign(this, data)
    }
    static fromDocument(document, parser = PARSER) {
        return new YouthResource(parser.parse(document))
    }
}
