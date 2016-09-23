import {classify} from 'utils/string'
import parser from 'prismic/parser'

export class Factory {
    getType(document) {
        if (!document) {
            return null
        }

        const {type} = document
        try {
            const {fromDocument} = require(`./${classify(type)}`)

            return fromDocument(document)
        } catch (error) {
            return parser.parse(document)
        }
    }
}

export default new Factory()
