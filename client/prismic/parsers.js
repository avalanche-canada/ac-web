import { lazyParse as parseDate } from '~/utils/date'
import camelCase from 'lodash/camelCase'
import identity from 'lodash/identity'
import get from 'lodash/get'
import { normalizeTags, boolean } from '~/prismic/utils'

const DEFAULTS = {}

export function parseLocation(document) {
    const { location } = parse(document).data

    return location ? [location.longitude, location.latitude] : null
}

const TypeTransformers = new Map([
    ['Date', parseDate],
    ['StructuredText', identity],
])

export function parseData(data, defaults = DEFAULTS, transformer = identity) {
    return transformer({
        ...defaults,
        ...Object.keys(data).reduce((object, key) => {
            const { type } = data[key]
            let { value } = data[key]

            if (TypeTransformers.has(type)) {
                value = TypeTransformers.get(type).call(null, value)
            }

            key = camelCase(key)

            object[key] = value === undefined ? defaults[key] : value

            return object
        }, {}),
    })
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

function transformWeatherForecast(forecast) {
    return mergeInData(forecast, {
        isLegacy: Array.isArray(forecast.data.outlook),
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
    ['weather-forecast', transformWeatherForecast],
])

export default function parse(object, defaults = DEFAULTS, transformer) {
    if (!object) {
        return {
            data: defaults,
        }
    }

    const { type } = object

    if (type === 'Group') {
        return parseGroup(object, defaults, transformer)
    }

    return parseDocument(
        object,
        defaults,
        DocumentTransformers.get(type) || transformer
    )
}

export function parseGroup({ value }, defaults, transformer) {
    return value.map(group => parseData(group, defaults, transformer))
}
