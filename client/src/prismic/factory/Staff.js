import PARSER from '../parser'

export function fromDocument(document, parser = PARSER) {
    const data = parser.parse(document)

    return {
        fullName: `${data.firstName} ${data.lastName}`,
        ...data,
    }
}
