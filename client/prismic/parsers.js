import { lazyParse as parseDate } from 'utils/date'
import camelCase from 'lodash/camelCase'
import identity from 'lodash/identity'
import DocumentTransformers from './transformers'

const TypeTransformers = new Map([
    ['Date', parseDate],
    ['StructuredText', identity],
    ['Group', parseGroup],
    ['SliceZone', parseSliceZone],
    ['Link.web', value => ({ type: 'Link.web', value })],
    ['Link.document', value => ({ type: 'Link.document', value })],
    ['Link.image', value => ({ type: 'Link.image', value })],
    ['Link.file', value => ({ type: 'Link.file', value })],
])

function parseValue({ type, value }) {
    if (TypeTransformers.has(type)) {
        const transformer = TypeTransformers.get(type)

        value = transformer(value)
    }

    return value
}

function parseSlice({ slice_type, slice_label, value, repeat, ...rest }) {
    const nonRepeat = rest['non-repeat']

    return {
        type: slice_type,
        label: slice_label,
        value: value && parseValue(value),
        repeat: repeat && repeat.map(item => parseData(item)),
        nonRepeat: nonRepeat && parseData(nonRepeat),
    }
}

function parseSliceZone(slices = []) {
    return slices.map(parseSlice)
}

function parseData(data, transformer = identity) {
    return transformer({
        ...Object.keys(data).reduce((object, key) => {
            const camelCaseKey = camelCase(key)

            object[camelCaseKey] = parseValue(data[key])

            return object
        }, {}),
    })
}

function parseGroup(group, transformer) {
    return group.map(item => parseData(item, transformer))
}

function parseDocument(document, transformer = identity) {
    const {
        type,
        first_publication_date,
        last_publication_date,
        tags,
        data,
        ...rest
    } = document

    Object.assign(rest, {
        type,
        firstPublicationDate: parseDate(first_publication_date),
        lastPublicationDate: parseDate(last_publication_date),
        tags: normalizeTags(tags),
        data: parseData(data[type]),
    })

    return transformer(rest)
}

export default function parse(object) {
    const { type, value } = object

    if (type === 'Group') {
        return parseGroup(value)
    }

    return parseDocument(object, DocumentTransformers.get(type))
}

export function parseLocation(document) {
    const { location } = parse(document).data

    return location ? [location.longitude, location.latitude] : null
}

// TODO: Remove that function. We should not need that.
function normalizeTags(tags) {
    if (Array.isArray(tags)) {
        return Array.from(new Set(tags.map(tag => tag.trim().toLowerCase())))
    }
}
