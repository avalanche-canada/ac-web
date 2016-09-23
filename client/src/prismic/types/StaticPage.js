import PARSER from '../parser'
import {boolean} from './utils'

const {assign} = Object

export default {
    fromDocument(document, parser = PARSER) {
        let {sharing, following, contacting, sidebar = [], ...props} = parser.parse(document)

        const withSharing = boolean(sharing)
        const withFollowing = boolean(following)
        const withContacting = boolean(contacting)

        return {
            ...props,
            sidebar: (withSharing || withFollowing || withContacting || sidebar.length) ? {
                withSharing,
                withFollowing,
                withContacting,
                content: sidebar,
            } : null
        }
    }
}
