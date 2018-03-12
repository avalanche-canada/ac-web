import parseDate from 'date-fns/parse'
import addDays from 'date-fns/add_days'
import * as Ratings from 'constants/forecast/rating'
import * as Modes from 'constants/forecast/mode'

function normalize(string) {
    return string.toUpperCase().trim()
}

function normalizeArray(tags) {
    return tags.map(normalize)
}

function transformProvider({
    loc_description,
    is_sponsor,
    prim_contact,
    ...provider
}) {
    return Object.assign(provider, {
        tags: normalizeArray(provider.tags),
        locDescription: loc_description,
        isSponsor: is_sponsor,
        isFeatured: is_sponsor,
        primContact: prim_contact,
    })
}

function transformCourse({ date_start, date_end, loc_description, ...course }) {
    return Object.assign(course, {
        tags: normalizeArray(course.tags),
        dateStart: parseDate(date_start),
        dateEnd: parseDate(date_end),
        locDescription: loc_description,
        provider: transformProvider(course.provider),
    })
}

export function transformProviderResponse(data) {
    return Object.assign(data, {
        results: data.results.map(transformProvider),
    })
}

export function transformCourseResponse(data) {
    return Object.assign(data, {
        results: data.results.map(transformCourse),
    })
}

function sanitizeMountainInformationNetworkSubmission(submission) {
    return {
        ...submission,
        latlng: submission.latlng.map(Number),
    }
}

export function sanitizeMountainInformationNetworkSubmissions(data) {
    if (Array.isArray(data)) {
        return data.map(sanitizeMountainInformationNetworkSubmission)
    }

    return sanitizeMountainInformationNetworkSubmission(data)
}

export function transformMountainConditionsReports(data = []) {
    return data.map(transformMountainConditionsReport)
}

function transformMountainConditionsReport({
    id,
    location_desc,
    dates,
    user = {},
    ...report
}) {
    return Object.assign(report, {
        id: String(id),
        user: {
            ...user,
            certification: user.certs,
        },
        dates: dates.map(date => parseDate(date)).sort(),
        locationDescription: location_desc,
    })
}

// TODO: Use constants server response to reduce client side transformation.
// See Maps below...

const TO_RATINGS = new Map([
    ['1:Low', Ratings.LOW],
    ['2:Moderate', Ratings.MODERATE],
    ['3:Considerable', Ratings.CONSIDERABLE],
    ['4:High', Ratings.HIGH],
    ['5:Extreme', Ratings.EXTREME],
    ["N/A:'Spring'", Ratings.NO_RATING],
    ['N/A:No Rating', Ratings.NO_RATING],
])
const TO_MODES = new Map([
    ['Off season', Modes.OFF],
    ['Summer situation', Modes.SUMMER],
    ['Spring situation', Modes.SPRING],
    ['Early season', Modes.EARLY_SEASON],
])

function transformDangerRating({ date, dangerRating }) {
    const { alp, tln, btl } = dangerRating

    return {
        date: parseDate(date),
        dangerRating: {
            alp: TO_RATINGS.get(alp),
            tln: TO_RATINGS.get(tln),
            btl: TO_RATINGS.get(btl),
        },
    }
}

function trim(text) {
    return typeof text === 'string' ? text.trim() : text
}

function asConfidenceObject(confidence) {
    const [level, comment] =
        typeof confidence === 'string' ? confidence.split(' - ') : []

    return {
        level,
        comment,
    }
}

export function transformForecast(forecast) {
    if (!forecast.region) {
        return forecast
    }

    const dateIssued = parseDate(forecast.dateIssued)
    const {
        dangerRatings = [],
        validUntil,
        dangerMode,
        confidence,
        avalancheSummary,
        snowpackSummary,
        weatherForecast,
    } = forecast

    // TODO(wnh): Clean this up and merge it into either the server side or the
    // transformDangerRating function
    function fixDangerRatingDates(x, n) {
        return Object.assign({}, x, {
            date: addDays(dateIssued, n + 1),
        })
    }

    return {
        ...forecast,
        confidence: asConfidenceObject(confidence),
        dangerMode: TO_MODES.get(dangerMode),
        dateIssued,
        validUntil: parseDate(validUntil),
        dangerRatings: dangerRatings
            .map(transformDangerRating)
            .map(fixDangerRatingDates),
        avalancheSummary: trim(avalancheSummary),
        snowpackSummary: trim(snowpackSummary),
        weatherForecast: trim(weatherForecast),
    }
}
