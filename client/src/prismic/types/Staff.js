import PARSER from '../parser'

const {assign} = Object

export default class Staff {
    constructor(data) {
        assign(this, data)
    }
    static fromDocument(document, parser = PARSER) {
        const data = parser.parse(document)

        return new Staff({
            fullName: `${data.firstName} ${data.lastName}`,
            ...data,
        })
    }
}
