import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import startOfMonth from 'date-fns/start_of_month'
import endOfMonth from 'date-fns/end_of_month'
import { startOfSeason, endOfSeason } from 'utils/date'
import * as Predicates from 'prismic/predicates'
import * as types from 'constants/prismic'
import { DateParam } from 'hooks/params'

// TODO: Find a way to reduce this file size and KEEP it easy to read
// Should it be splited into different modules?

export function uid(type, uid) {
    return {
        predicates: [Predicates.uid(type, uid)],
    }
}

export function all(type) {
    return {
        predicates: [Predicates.type(type)],
    }
}

export function ids(ids) {
    return {
        predicates: [Predicates.in('document.id', ids)],
        pageSize: ids.length,
    }
}

export const mw = {
    forecast(date = new Date()) {
        return {
            predicates: [
                Predicates.field(
                    types.WEATHER_FORECAST,
                    'date',
                    DateParam.format(date)
                ),
            ],
        }
    },
    tutorial(id) {
        return uid(types.WEATHER_TUTORIAL, id)
    },
}

export const tutorial = {
    article(id, locale) {
        return {
            ...uid(types.TUTORIAL_ARTICLE, id),
            locale,
        }
    },
    home(locale) {
        return {
            ...all(types.TUTORIAL),
            locale,
        }
    },
}

export function sponsor(id) {
    return uid(types.SPONSOR, id)
}

export function generic(id) {
    return uid(types.GENERIC, id)
}

export const fatal = {
    accident(id) {
        return uid(types.FATAL_ACCIDENT, id)
    },
    accidents() {
        const field = my(types.FATAL_ACCIDENT, 'dateOfAccident')

        return {
            predicates: [
                Predicates.dateAfter(
                    field,
                    DateParam.format(addDays(startOfSeason(), -1))
                ),
                Predicates.dateBefore(
                    field,
                    DateParam.format(addDays(endOfSeason(), 1))
                ),
            ],
            pageSize: MAX_PAGE_SIZE,
        }
    },
}

export const hotZone = {
    report(name, date) {
        const { HOTZONE_REPORT } = types
        const { predicates } = hotZone.reports(date)

        predicates.push(Predicates.field(HOTZONE_REPORT, 'region', name))

        return {
            predicates,
            options: {
                pageSize: 1,
                orderings: [`${my(HOTZONE_REPORT, 'dateOfIssue')} desc`],
            },
        }
    },
    uid(id) {
        return uid(types.HOTZONE_REPORT, id)
    },
    reports(date) {
        const { HOTZONE_REPORT } = types

        return {
            predicates: [
                ...rangePredicates(
                    my(HOTZONE_REPORT, 'dateOfIssue'),
                    my(HOTZONE_REPORT, 'validUntil'),
                    date
                ),
            ],
        }
    },
}

Object.assign(hotZone.reports, {
    monthly(region, date) {
        const { HOTZONE_REPORT } = types
        const start = DateParam.format(startOfMonth(date))
        const end = DateParam.format(endOfMonth(date))

        return {
            predicates: [
                Predicates.field(HOTZONE_REPORT, 'region', region),
                Predicates.dateBefore(my(HOTZONE_REPORT, 'dateOfIssue'), end),
                Predicates.dateAfter(my(HOTZONE_REPORT, 'validUntil'), start),
            ],
        }
    },
})

export function highlight() {
    return rangeForType(types.HIGHLIGHT)
}

export function spaw() {
    return rangeForType(types.SPAW)
}

export const glossary = {
    glossary(id = 'glossary') {
        return {
            ...FETCH_DEFINITION_TITLE_OPTIONS,
            ...uid(types.GLOSSARY, id),
        }
    },
    definition(id) {
        return {
            ...FETCH_DEFINITION_TITLE_OPTIONS,
            ...uid(types.DEFINITION, id),
        }
    },
    definitions() {
        return {
            ...FETCH_DEFINITION_TITLE_OPTIONS,
            predicates: [Predicates.type(types.DEFINITION)],
        }
    },
}

export const feed = {
    splash({ type, tags }) {
        const { predicates } = all(type)

        if (Array.isArray(tags) && tags.length > 0) {
            predicates.push(Predicates.tags(Array.from(tags)))
        }

        if (type === types.EVENT) {
            predicates.push(
                Predicates.dateAfter(
                    my(type, 'start_date'),
                    DateParam.format(new Date())
                )
            )
        }

        return {
            predicates,
            pageSize: 5,
            orderings: [FEED_ORDERINGS.get(type)],
        }
    },
    sidebar({ type, uid }) {
        const params = feed.splash({ type })

        params.predicates.push(Predicates.not(my(type, 'uid'), uid))

        return Object.assign(params, {
            pageSize: 7,
        })
    },
    blog({ year, month, category, page = 1, pageSize = 10 }) {
        const { BLOG } = types
        const { predicates } = all(BLOG)

        if (year) {
            predicates.push(Predicates.year(my(BLOG, 'date'), year))
        }

        if (month) {
            predicates.push(Predicates.month(my(BLOG, 'date'), month))
        }

        if (category) {
            predicates.push(Predicates.at(my(BLOG, 'category'), category))
        }

        return {
            page,
            pageSize,
            predicates,
            orderings: [FEED_ORDERINGS.get(BLOG)],
        }
    },
    news({ year, month, tags, page = 1, pageSize = 10 }) {
        const { NEWS } = types
        const predicates = [Predicates.type(NEWS)]

        if (year) {
            predicates.push(Predicates.year(my(NEWS, 'date'), year))
        }

        if (month) {
            predicates.push(Predicates.month(my(NEWS, 'date'), month))
        }

        if (tags.size) {
            predicates.push(Predicates.tags(Array.from(tags)))
        }

        return {
            page,
            pageSize,
            predicates,
            orderings: [FEED_ORDERINGS.get(NEWS)],
        }
    },
    events({ past = false, tags = new Set(), page = 1, pageSize = 10 }) {
        const { EVENT } = types
        const ordering = past
            ? `${FEED_ORDERINGS.get(EVENT)} desc`
            : FEED_ORDERINGS.get(EVENT)
        const predicate = past ? Predicates.dateBefore : Predicates.dateAfter
        const timestamp = DateParam.format(addDays(new Date(), -1))
        const predicates = []

        predicates.push(predicate(my(EVENT, 'end_date'), timestamp))

        if (tags.size) {
            predicates.push(Predicates.tags(Array.from(tags)))
        }

        return {
            page,
            pageSize,
            predicates,
            orderings: [ordering],
        }
    },
}

export function tags(type, page = 1) {
    return {
        ...all(type),
        fetch: 'document.tags',
        pageSize: MAX_PAGE_SIZE,
        page,
    }
}

// Contants and utils
const MAX_PAGE_SIZE = 100
const FETCH_DEFINITION_TITLE_OPTIONS = {
    fetchLinks: 'definition.title',
    pageSize: MAX_PAGE_SIZE,
}
function rangePredicates(start, end, date = new Date()) {
    return [
        Predicates.dateBefore(start, DateParam.format(addDays(date, 1))),
        Predicates.dateAfter(end, DateParam.format(subDays(date, 1))),
    ]
}
function rangeForType(type) {
    return {
        predicates: [
            Predicates.type(type),
            ...rangePredicates(my(type, 'start'), my(type, 'end')),
        ],
    }
}
const FEED_ORDERINGS = new Map([
    [types.NEWS, `${my(types.NEWS, 'date')} desc`],
    [types.BLOG, `${my(types.BLOG, 'date')} desc`],
    [types.EVENT, my(types.EVENT, 'start_date')],
])
function my(type, field) {
    return `my.${type}.${field}`
}
