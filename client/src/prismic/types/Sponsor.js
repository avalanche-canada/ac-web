import PARSER from '../parser'

const {assign} = Object

export default class Sponsor {
    constructor(data) {
        assign(this, data)
    }
    static fromDocument(document, parser = PARSER) {
        return new Sponsor(parser.parse(document))
    }
}
