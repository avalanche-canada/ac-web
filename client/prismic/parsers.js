import { lazyParse as parseDate } from 'utils/date'
import camelCase from 'lodash/camelCase'
import identity from 'lodash/identity'
import get from 'lodash/get'

const StringToBoolean = new Map([
    ['Yes', true],
    ['No', false],
    [undefined, false],
    [null, false],
])

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

function boolean(string) {
    return StringToBoolean.get(string)
}

function normalizeTags(tags) {
    if (Array.isArray(tags)) {
        return Array.from(new Set(tags.map(tag => tag.trim().toLowerCase())))
    }
}

function parseValue({ type, value }, defaultValue) {
    if (TypeTransformers.has(type)) {
        const transformer = TypeTransformers.get(type)

        value = transformer(value)
    }

    return value === undefined ? defaultValue : value
}

function parseSlice({ slice_type, slice_label, value }) {
    return {
        type: slice_type,
        label: slice_label,
        value: parseValue(value),
    }
}

function parseSliceZone(slices = []) {
    return slices.map(parseSlice)
}

function parseData(data, defaults = {}, transformer = identity) {
    return transformer({
        ...defaults,
        ...Object.keys(data).reduce((object, key) => {
            const camelCaseKey = camelCase(key)

            object[camelCaseKey] = parseValue(data[key], defaults[camelCaseKey])

            return object
        }, {}),
    })
}

function parseGroup(group, defaults, transformer) {
    return group.map(item => parseData(item, defaults, transformer))
}

function parseDocument(document, defaults, transformer = identity) {
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
        data: parseData(data[type], defaults),
    })

    return transformer(rest)
}

function transformBlog({ uid, type, tags, data }) {
    const { shortlede, body, previewImage, date } = data

    return {
        ...data,
        type,
        uid,
        tags,
        featured: tags.includes('featured'),
        headline: shortlede,
        content: body,
        preview: get(previewImage, ['views', 'column']),
        link: `/${type}s/${uid}`,
        year: date && date.getFullYear(),
        month: date && date.getMonth(),
    }
}

function transformEvent({ uid, type, tags, data }) {
    const { shortlede, description, featuredImage, startDate, endDate } = data

    return {
        ...data,
        type,
        uid,
        tags,
        featured: tags.includes('featured'),
        headline: shortlede,
        content: description,
        preview: get(featuredImage, 'main'),
        link: `/${type}s/${uid}`,
        start: startDate,
        end: endDate,
        date: startDate,
        year: startDate && startDate.getFullYear(),
        month: startDate && startDate.getMonth(),
    }
}

function transformNews({ uid, type, tags, data }) {
    const { shortlede, body, featuredImage, date } = data

    return {
        ...data,
        type,
        uid,
        tags,
        featured: tags.includes('featured'),
        headline: shortlede,
        content: body,
        preview: get(featuredImage, ['views', 'preview']),
        link: `/${type}/${uid}`,
        year: date.getFullYear(),
        month: date.getMonth(),
    }
}

function transformStaff(staff) {
    const { firstName, lastName } = staff.data

    return mergeInData(staff, {
        fullName: `${firstName} ${lastName}`,
    })
}

function transformStaticPage(page) {
    let { sharing, following, contacting, sidebar = [], contact } = page.data

    sharing = boolean(sharing)
    following = boolean(following)
    contacting = boolean(contacting)

    if (sharing || following || contacting || sidebar.length) {
        sidebar = {
            share: sharing,
            follow: following,
            contact: contacting
                ? typeof contact === 'string'
                  ? contact.replace(/^mailto:/, '')
                  : true
                : false,
            content: sidebar,
        }
    } else {
        sidebar = null
    }

    return mergeInData(page, { sidebar })
}

function transformSponsor(sponsor) {
    return mergeInData(sponsor, {
        logo: sponsor.data.image229,
    })
}

function mergeInData({ data, ...object }, collection) {
    return Object.assign(object, {
        data: {
            ...data,
            ...collection,
        },
    })
}

// TODO: Review if we need all these transformers
const DocumentTransformers = new Map([
    ['blog', transformBlog],
    ['event', transformEvent],
    ['news', transformNews],
    ['staff', transformStaff],
    ['static-page', transformStaticPage],
    ['sponsor', transformSponsor],
])

export default function parse(object, defaults = {}, transformer) {
    if (!object) {
        return {
            data: defaults,
        }
    }

    const { type, value } = object

    if (type === 'Group') {
        return parseGroup(value, defaults, transformer)
    }

    return parseDocument(
        object,
        defaults,
        DocumentTransformers.get(type) || transformer
    )
}

export function parseLocation(document) {
    const { location } = parse(document).data

    return location ? [location.longitude, location.latitude] : null
}
