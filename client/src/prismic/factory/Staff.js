import PARSER from '../parser'

export default function(document, parser = PARSER) {
    const data = parser.parse(document)

    return {
        fullName: `${data.firstName} ${data.lastName}`,
        ...data,
    }
}
