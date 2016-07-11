import {classify} from 'utils/string'

export class TypeFactory {
    getType(document) {
        if (!document) {
            return null
        }

        const {type} = document
        const Type = require(`./${classify(type)}`).default

        if (!Type) {
            throw new Error(`Document type "${type}" not supported by ${this.constructor.name}.`)
        }

        return Type.fromDocument(document)
    }
}

export default new TypeFactory()
