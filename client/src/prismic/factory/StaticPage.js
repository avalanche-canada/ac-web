import PARSER from '../parser'
import {boolean} from './utils'

export function fromDocument(document, parser = PARSER) {
    let {sharing, following, contacting, sidebar = [], contact, ...props} = parser.parse(document)

    sharing = boolean(sharing)
    following = boolean(following)
    contacting = boolean(contacting)

    return {
        ...props,
        sidebar: (sharing || following || contacting || sidebar.length) ? {
            share: sharing,
            follow: following,
            contact: contacting ? (
                typeof contact === 'string' ? contact : true
            ): false,
            content: sidebar,
        } : null
    }
}
