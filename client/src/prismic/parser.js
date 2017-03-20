import {Fragments, Document, Prismic} from 'prismic.io'
import camelCase from 'lodash/camelCase'
import parse from 'date-fns/parse'
import linkResolver from 'prismic/linkResolver'
import htmlSerializer from 'prismic/htmlSerializer'

// TODO: Fixes constructor for prismic object, should a PR to prismic.io repo
// https://github.com/prismicio/javascript-kit
Document.prototype.constructor = Document
Object.keys(Fragments).forEach(key => Fragments[key].prototype.constructor = Fragments[key])

const RESERVED_PROPERTIES = new Set(['uid', 'id', 'type'])

function parseKey(key) {
    const [type, name] = key.split('.')

    if (RESERVED_PROPERTIES.has(name)) {
        const [letter, ...letters] = name

        return type + letter.toUpperCase() + letters
    }

    return camelCase(name)
}

export class Parser {
    constructor(linkResolver, htmlSerializer) {
        Object.assign(this, {linkResolver, htmlSerializer})
    }
    parse(document) {
        const {fragments, data, type, uid, tags, id} = document
        const asKey = document.constructor === Document ? parseKey : camelCase
        const properties = Object.keys(fragments).reduce((value, key) => {
            const fragment = fragments[key]

            value[asKey(key)] = this.parseFragment(fragment, data[key])

            return value
        }, {})

        if (document instanceof Document) {
            return {
                id,
                type,
                uid,
                tags: Array.isArray(tags) ? tags.map(tag => tag.toLowerCase()) : [],
                // TODO: Should be in a "properties" property
                ...properties,
            }
        } else {
            return properties
        }
    }
    parseSlice({sliceType, label, value}, data) {
        return {
            type: sliceType,
            label,
            content: this.parseFragment(value, data)
        }
    }
    parseFragment = (fragment, data) => {
        switch (fragment.constructor) {
            case Fragments.Text:
            case Fragments.Select:
            case Fragments.Color:
                return fragment.asText()
            case Fragments.Date:
                return data ? parse(data.value, 'YYYY-MM-DD') : fragment.value
            case Fragments.Number:
            case Fragments.Timestamp:
            case Fragments.Embed:
            case Fragments.ImageLink:
                return fragment.value
            case Fragments.Image:
                return fragment.main
            case Fragments.DocumentLink:
                return fragment.document
            case Fragments.WebLink:
            case Fragments.FileLink:
                return fragment.url(this.linkResolver)
            case Fragments.GeoPoint:
                return {...fragment}
            case Fragments.StructuredText:
                return fragment.asHtml(this.linkResolver, this.htmlSerializer)
            case Fragments.Group:
                return fragment.value.map(this.parseFragment)
            case Fragments.SliceZone:
                return fragment.slices.map(this.parseFragment)
            case Fragments.Slice:
                return this.parseSlice(fragment, data)
            default:
                if (fragment.fragments) {
                    return this.parse(fragment)
                } else {
                    console.warn(`${fragment.constructor.name} not recognized in ${this.constructor.name}`, fragment)
                }
        }
    }
}

export default new Parser(linkResolver, htmlSerializer)

export function parseLocation({location}) {
    return [location.longitude, location.latitude]
}
