import PARSER from '../parser'

const {assign} = Object

export default class StaticPage {
    constructor(data) {
        assign(this, data)
    }
    static fromDocument(document, parser = PARSER) {
        return new StaticPage(parser.parse(document))
    }
}
