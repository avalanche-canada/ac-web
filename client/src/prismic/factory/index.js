import parser from 'prismic/parser'
import blog from './Blog'
import event from './Event'
import news from './News'
import staff from './Staff'
import staticPage from './StaticPage'

const factories = new Map([
    ['blog', blog],
    ['event', event],
    ['news', news],
    ['staff', staff],
    ['static-page', staticPage],
])

export default {
    getType(document) {
        if (!document) {
            return null
        }

        const {type} = document

        if (factories.has(type)) {
            return factories.get(type).call(null, document)
        } else {
            return parser.parse(document)
        }
    }
}
