import {Fragments, Document, Prismic} from 'prismic.io'
import camelCase from 'lodash/camelCase'

const {keys, assign} = Object
const {isArray} = Array

// TODO: Fixes constructor for prismic object, should a PR to prismic.io repo
Document.prototype.constructor = Document
keys(Fragments).forEach(key => Fragments[key].prototype.constructor = Fragments[key])

function parseKey(key) {
    const [type, name] = key.split('.')

    return camelCase(name)
}

export class Parser {
    constructor(htmlSerializer) {
        assign(this, {htmlSerializer})
    }
    parse(document) {
        const {fragments, type, uid, tags, id} = document
        const asKey = document.constructor === Document ? parseKey : camelCase
        const data = keys(fragments).reduce((value, key) => {
            const fragment = fragments[key]

            value[asKey(key)] = this.parseFragment(fragment)

            return value
        }, {})

        if (document instanceof Document) {
            return {
                id,
                uid,
                tags: isArray(tags) ? tags.map(tag => tag.toLowerCase()) : [],
                type,
                ...data,
            }
        } else {
            return data
        }
    }
    parseSlice({sliceType, label, value}) {
        return {
            type: sliceType,
            label,
            content: this.parseFragment(value)
        }
    }
    parseFragment(fragment) {
        switch (fragment.constructor) {
            case Fragments.Text:
            case Fragments.FileLink:
            case Fragments.Select:
            case Fragments.Color:
                return fragment.asText()
            case Fragments.Number:
            case Fragments.Date:
            case Fragments.Timestamp:
            case Fragments.Embed:
            case Fragments.ImageLink:
                return fragment.value
            case Fragments.DocumentLink:
                return fragment.document
            case Fragments.Image:
                return fragment.main
            case Fragments.WebLink:
            case Fragments.FileLink:
                return fragment.url()
            case Fragments.GeoPoint:
                return {...fragment}
            case Fragments.StructuredText:
                return fragment.asHtml(this.htmlSerializer)
            case Fragments.Group:
                return fragment.value.map(::this.parseFragment)
            case Fragments.SliceZone:
                return fragment.slices.map(::this.parseFragment)
            case Fragments.Slice:
                return this.parseSlice(fragment)
            default:
                if (fragment.fragments) {
                    return this.parse(fragment)
                } else {
                    console.warn(`${fragment.constructor.name} not recognized in ${this.constructor.name}`, fragment)
                }
        }
    }
}

export default new Parser()
