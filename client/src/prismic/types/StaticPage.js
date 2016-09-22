import PARSER from '../parser'
import {boolean} from './utils'

const {assign} = Object

export default {
    fromDocument(document, parser = PARSER) {
        const {sharing, following, contacting, sidebar = [], ...props} = parser.parse(document)

        return {
            ...props,
            sidebar: (sharing || following || contacting || sidebar.length) ? {
                withSharing: boolean(sharing),
                withFollowing: boolean(following),
                withContacting: boolean(contacting),
                content: sidebar,
            } : null
        }
    }
}
