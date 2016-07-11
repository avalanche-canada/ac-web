import PARSER from '../parser'

const {assign} = Object

export default class Generic {
    constructor(data) {
        assign(this, data)
    }
    static fromDocument(document, parser = PARSER) {
        return new Generic(parser.parse(document))
    }
}
